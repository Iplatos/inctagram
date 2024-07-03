import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { PostComment, PostCommentT } from './post-comment';
import { PrivatePostComment, PrivatePostCommentT } from './privat-post-comment';
import { PublicPostComment, PublicPostCommentT } from './public-post-comment';

const meta = {
  component: PostComment,
  tags: ['autodocs'],
  title: 'features/post/PostComment',
} satisfies Meta<typeof PostComment>;

export default meta;

// @ts-ignore
type Story<T> = StoryObj<typeof meta, T>;

const samplePostCommentData: PostCommentT = {
  avatar: 'https://via.placeholder.com/150',
  createdAt: '2024-07-01T11:39:03.738Z',
  likesCount: 2,
  text: 'This is a sample comment text.',
  userName: 'John Doe',
};

const samplePrivatePostCommentData: PrivatePostCommentT = {
  avatar: 'https://via.placeholder.com/150',
  createdAt: '2024-07-01T11:39:03.738Z',
  isLiked: true,
  likesCount: 5,
  text: 'This is a sample private comment text.',
  userName: 'Jane Smith',
};

// export const PostCommentDefault: Story<PostCommentT> = {
//   arg: {
//     ...samplePostCommentData,
//   },
//
//   render: function Render(arg: PostCommentT) {
//     return <PostComment {...arg} />;
//   },
// };
// Enable errors time

export const Public: Story<PublicPostCommentT> = {
  args: {
    ...samplePostCommentData,
    answers: [samplePostCommentData, samplePostCommentData],
  },

  render: function Render(args: PublicPostCommentT) {
    return <PublicPostComment {...args} />;
  },
};

export const Private: Story<PrivatePostCommentT> = {
  args: {
    ...samplePrivatePostCommentData,
    answers: [samplePrivatePostCommentData, samplePrivatePostCommentData],
  },

  render: function Render(args: PrivatePostCommentT) {
    return <PrivatePostComment {...args} />;
  },
};
