import { PostCard } from '@/features/post/post-card/post-card';
import { PrivatePostCardProps } from '@/features/post/post-card/private-post-card';
import { ProfilePrivatePostCard } from '@/features/post/post-card/profile-post-card';
import { PublicPostCard, PublicPostCardProps } from '@/features/post/post-card/public-post-card';
import { PrivatePostCommentProps } from '@/features/post/post-comment/private-post-comment';
import { PublicPostCommentProps } from '@/features/post/post-comment/public-post-comment';
import { Meta, StoryObj } from '@storybook/react';

import { FriendPrivatePostCard } from './friend-post-card';

const meta = {
  component: PostCard,
  tags: ['autodocs'],
  title: 'features/post/PostCard',
} satisfies Meta<typeof PostCard>;

export default meta;

// @ts-ignore
type Story<T> = StoryObj<typeof meta, T>;

const comments: PublicPostCommentProps[] = [
  {
    answers: [
      {
        commentId: 'comment1',
        createdAt: '2009-07-01T11:00:00Z',
        id: 'answer1',
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        commentId: 'comment1',
        createdAt: '2024-07-01T12:00:00Z',
        id: 'answer2',
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    commentId: 'comment1',
    createdAt: '2024-07-01T10:00:00Z',
    id: 'comment1',
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [
      {
        commentId: 'comment2',
        createdAt: '2024-07-02T11:00:00Z',
        id: 'answer3',
        likesCount: 2,
        text: 'Answer to the second comment.Answer to the second comment.Answer to the second comment.Answer to the second comment.',
        userName: 'User5',
      },
    ],
    commentId: 'comment2',
    createdAt: '2024-07-02T10:00:00Z',
    id: 'comment2',
    likesCount: 2,
    text: 'This is the second comment.This is the second comment.This is the second comment.This is the second comment.',
    userName: 'User4',
  },
  {
    answers: [],
    commentId: 'comment3',
    createdAt: '2024-07-03T10:00:00Z',
    id: 'comment3',
    likesCount: 0,
    text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
    userName: 'User6',
  },
];

const privateComments: PrivatePostCommentProps[] = [
  {
    answers: [
      {
        commentId: 'privateComment1',
        createdAt: '2024-07-01T11:00:00Z',
        id: 'privateAnswer1',
        isLiked: true,
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        commentId: 'privateComment1',
        createdAt: '2024-07-01T12:00:00Z',
        id: 'privateAnswer2',
        isLiked: false,
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    commentId: 'privateComment1',
    createdAt: '2024-07-01T10:00:00Z',
    id: 'privateComment1',
    isLiked: true,
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [
      {
        commentId: 'privateComment2',
        createdAt: '2024-07-01T11:00:00Z',
        id: 'privateAnswer3',
        isLiked: true,
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        commentId: 'privateComment2',
        createdAt: '2024-07-01T12:00:00Z',
        id: 'privateAnswer4',
        isLiked: false,
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    commentId: 'privateComment2',
    createdAt: '2024-07-01T10:00:00Z',
    id: 'privateComment2',
    isLiked: true,
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [],
    commentId: 'privateComment3',
    createdAt: '2024-07-03T10:00:00Z',
    id: 'privateComment3',
    isLiked: false,
    likesCount: 0,
    text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
    userName: 'User6',
  },
];

export const Public: Story<PublicPostCardProps> = {
  args: {
    comments,
    createdAt: '2024-07-01T10:00:00Z',
    likesCount: 100,
    userName: 'Patrik',
  },

  render: function Render(args: PublicPostCardProps) {
    return <PublicPostCard {...args} />;
  },
};

export const ProfilePostCard: Story<Omit<PrivatePostCardProps, 'headerSection'>> = {
  args: {
    comments: privateComments,
    createdAt: '2024-07-01T10:00:00Z',
    isFollowing: true,
    isPostLiked: false,
    likesCount: 100,
    postId: '4d5as4d5as4dd',
    userId: 'das4d5as4d5as4dd',
    userName: 'Patrik',
  },

  render: function Render(args: Omit<PrivatePostCardProps, 'headerSection'>) {
    return <ProfilePrivatePostCard {...args} />;
  },
};

export const FriendPostCard: Story<Omit<PrivatePostCardProps, 'headerSection'>> = {
  args: {
    comments: privateComments,
    createdAt: '2024-07-01T10:00:00Z',
    isFollowing: true,
    isPostLiked: false,
    likesCount: 100,
    postId: '4d5as4d5as4dd',
    userId: 'das4d5as4d5as4dsd',
    userName: 'Frank',
  },

  render: function Render(args: Omit<PrivatePostCardProps, 'headerSection'>) {
    return <FriendPrivatePostCard {...args} />;
  },
};
