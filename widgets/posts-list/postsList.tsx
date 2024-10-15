import { FC } from 'react';

import { openModal } from '@/shared/api/modal-slice';
import { useAppDispatch } from '@/shared/api/pretyped-redux-hooks';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { CropProps, CroppedImage } from '@/shared/ui/croppedImage';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './postsList.module.scss';

// For now, only avatar related data is contained in one post. Will be expanded in the future
export type Post = {
  cropProps?: CropProps;
  src: StaticImport | string;
};

export type PostsListProps = {
  className?: string;
  posts?: Post[];
};

export const PostsList: FC<PostsListProps> = ({ className, posts = [] }) => {
  const { postsList: t } = useTranslation().t.common;

  const mappedPosts = posts.map(({ cropProps = {}, src }, index) => (
    <div className={s.post} key={index}>
      <CroppedImage alt={''} fill src={src} {...cropProps} />
    </div>
  ));

  const dispatch = useAppDispatch();

  return (
    <section className={clsx(s.container, className)}>
      {posts.length ? (
        mappedPosts
      ) : (
        <div className={s.messageContainer}>
          <Typography.H1 className={s.message} component={'h2'}>
            {t.noPostsMessage}
          </Typography.H1>
          <Button onClick={() => dispatch(openModal())}>{t.addPostButton}</Button>
        </div>
      )}
    </section>
  );
};
