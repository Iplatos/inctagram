import { PostCard } from '@/features/post/post-card/post-card';
import { PrivatePostCard, PrivatePostCardProps } from '@/features/post/post-card/private-post-card';
import { PublicPostCard, PublicPostCardProps } from '@/features/post/post-card/public-post-card';
import { PrivatePostCommentProps } from '@/features/post/post-comment/privat-post-comment';
import { PublicPostCommentProps } from '@/features/post/post-comment/public-post-comment';
import { Meta, StoryObj } from '@storybook/react';

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
        createdAt: '2024-07-01T11:00:00Z',
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        createdAt: '2024-07-01T12:00:00Z',
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    createdAt: '2024-07-01T10:00:00Z',
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [
      {
        createdAt: '2024-07-02T11:00:00Z',
        likesCount: 2,
        text: 'Answer to the second comment.Answer to the second comment.Answer to the second comment.Answer to the second comment.',
        userName: 'User5',
      },
    ],
    createdAt: '2024-07-02T10:00:00Z',
    likesCount: 2,
    text: 'This is the second comment.This is the second comment.This is the second comment.This is the second comment.',
    userName: 'User4',
  },
  {
    answers: [],
    createdAt: '2024-07-03T10:00:00Z',
    likesCount: 0,
    text: 'This is the third comment with no answers.This is the third comment with no answers.This is the third comment with no answers.',
    userName: 'User6',
  },
];
const privateComments: PrivatePostCommentProps[] = [
  {
    answers: [
      {
        createdAt: '2024-07-01T11:00:00Z',
        isLiked: true,
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        createdAt: '2024-07-01T12:00:00Z',
        isLiked: false,
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    createdAt: '2024-07-01T10:00:00Z',
    isLiked: true,
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [
      {
        createdAt: '2024-07-01T11:00:00Z',
        isLiked: true,
        likesCount: 3,
        text: 'This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.This is an answer to the first comment.',
        userName: 'User2',
      },
      {
        createdAt: '2024-07-01T12:00:00Z',
        isLiked: false,
        likesCount: 1,
        text: 'Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.Another answer to the first comment.',
        userName: 'User3',
      },
    ],
    createdAt: '2024-07-01T10:00:00Z',
    isLiked: true,
    likesCount: 5,
    text: 'This is the first comment.This is the first comment.This is the first comment.This is the first comment.',
    userName: 'User1',
  },
  {
    answers: [],
    createdAt: '2024-07-03T10:00:00Z',
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

export const UserCard: Story<PrivatePostCardProps> = {
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

  render: function Render(args: PrivatePostCardProps) {
    return <PrivatePostCard {...args} />;
  },
};

export const FriendCard: Story<PrivatePostCardProps> = {
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

  render: function Render(args: PrivatePostCardProps) {
    return <PrivatePostCard {...args} />;
  },
};
