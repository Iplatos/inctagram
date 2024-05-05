import { FC } from 'react';

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
  posts: Post[];
};

export const PostsList: FC<PostsListProps> = ({ className, posts }) => {
  const mappedPosts = posts.map(({ cropProps = {}, src }, index) => (
    <div className={s.post} key={index}>
      <CroppedImage alt={''} fill src={src} {...cropProps} />
    </div>
  ));

  return (
    <section className={clsx(s.container, className)}>
      {posts.length ? (
        mappedPosts
      ) : (
        <div className={s.messageContainer}>
          <Typography.H1 className={s.message} component={'h2'}>
            There are not posts yet
          </Typography.H1>
          <Button>create post</Button>
        </div>
      )}
    </section>
  );
};
