import React, { FC } from 'react';

import { CropProps, CroppedImage } from '@/shared/ui/croppedImage';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './postsList.module.scss';

// For now, only avatar related data is contained in one post. Will be expanded in the future
export type Post = {
  cropProps?: CropProps;
  src: StaticImport | string;
};

export type PostsListProps = {
  posts: Post[];
};

export const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <section className={s.container}>
      {posts.map(({ cropProps = {}, src }, index) => (
        <div className={s.post} key={index}>
          <CroppedImage alt={''} fill src={src} {...cropProps} />
        </div>
      ))}
    </section>
  );
};
