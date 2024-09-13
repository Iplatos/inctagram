import { ReactNode, useId, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

import { pseudoRandomBytes } from 'crypto';

import { useTranslation } from '@/shared/hooks';
import { Post } from '@/shared/types/public.types';
import { Button, Modal, Typography } from '@/shared/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

import s from './publicPosts.module.scss';

import { UsersCountCard } from '../UsersCountCard/UsersCountCard';
import { PublicPost } from './PublicPost/PublicPost';

type Props = {
  posts?: Post[];
  usersCount?: number;
};

export const PublicPosts = (props: Props) => {
  const router = useRouter();

  const { publicPage: t } = useTranslation().t;

  return (
    <div className={s.page}>
      <div className={s['count-panel']}>
        <UsersCountCard userCount={props.usersCount} />
      </div>
      <div className={s.posts}>
        {props.posts?.map(post => (
          <PublicPost
            hide={t.hide}
            key={post.id}
            locale={router.locale}
            post={post}
            showMore={t.showMore}
          />
        ))}
      </div>
    </div>
  );
};
