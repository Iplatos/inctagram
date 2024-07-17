import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { PostComment, PostCommentProps } from './post-comment';
import { PrivatePostComment, PrivatePostCommentProps } from './private-post-comment';
import { PublicPostComment, PublicPostCommentProps } from './public-post-comment';

const meta = {
  component: PostComment,
  tags: ['autodocs'],
  title: 'features/post/PostComment',
} satisfies Meta<typeof PostComment>;

export default meta;

// @ts-ignore
type Story<T> = StoryObj<typeof meta, T>;

const samplePostCommentData: PostCommentProps = {
  avatar: 'https://via.placeholder.com/150',
  createdAt: '2024-07-01T11:39:03.738Z',
  likesCount: 2,
  text: 'This is a sample comment text.',
  userName: 'John Doe',
};

const samplePrivatePostCommentData: PrivatePostCommentProps = {
  avatar: 'https://via.placeholder.com/150',
  createdAt: '2024-07-01T11:39:03.738Z',
  isLiked: true,
  likesCount: 5,
  text: 'This is a sample private comment text.',
  userName: 'Jane Smith',
};

export const Public: Story<PublicPostCommentProps> = {
  args: {
    ...samplePostCommentData,
    answers: [samplePostCommentData, samplePostCommentData],
  },

  render: function Render(args: PublicPostCommentProps) {
    return <PublicPostComment {...args} />;
  },
};

export const PublicWithNoAnswers: Story<PublicPostCommentProps> = {
  args: {
    ...samplePostCommentData,
  },

  render: function Render(args: PublicPostCommentProps) {
    return <PublicPostComment {...args} />;
  },
};

export const Private: Story<PrivatePostCommentProps> = {
  args: {
    ...samplePrivatePostCommentData,
    answers: [samplePrivatePostCommentData, samplePrivatePostCommentData],
  },

  render: function Render(args: PrivatePostCommentProps) {
    return <PrivatePostComment {...args} />;
  },
};

export const PrivateWithNoAnswers: Story<PrivatePostCommentProps> = {
  args: {
    ...samplePrivatePostCommentData,
  },

  render: function Render(args: PrivatePostCommentProps) {
    return <PrivatePostComment {...args} />;
  },
};
