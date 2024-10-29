import React from 'react';

import { HeaderPostCard } from '@/features/post/post-card/header-post-card/header-post-card';
import { PostCard } from '@/features/post/post-card/post-card';
import { PostInfoSection } from '@/features/post/post-card/post-info-section';
import {
  PublicPostComment,
  PublicPostCommentProps,
} from '@/features/post/post-comment/public-post-comment';

export type PublicPostCardProps = {
  avatar?: string;
  comments?: PublicPostCommentProps[];
  createdAt: string;
  likesCount?: number;
  userName: string;
};

export const PublicPostCard = (props: PublicPostCardProps) => {
  const { comments = [], createdAt, likesCount, userName } = props;
  const icons = [
    {
      avatar: '',
      userName: 'Patrik Jk',
    },
    {
      avatar: '',
      userName: 'Roben',
    },
    {
      avatar: '',
      userName: 'Matias',
    },
  ];

  return (
    <PostCard
      commentsSection={comments.map((comment, index) => (
        <PublicPostComment {...comment} key={index} />
      ))}
      headerSection={<HeaderPostCard userName={userName} />}
      infoSection={<PostInfoSection createdAt={createdAt} icons={icons} likesCount={likesCount} />}
    />
  );
};
