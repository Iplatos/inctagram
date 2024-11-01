import { getMockPublicPostComments as getMockPublicPCWA } from '@/features/post/comment/comment.stories';
import { Meta, StoryObj } from '@storybook/react';

import { FriendPrivatePostCard } from './friend-post-card';
import { PostCard } from './post-card';
import { PrivatePostCardProps } from './private-post-card';
import { ProfilePrivatePostCard } from './profile-post-card';
import { PublicPostCard, PublicPostCardProps } from './public-post-card';

const meta = {
  component: PostCard,
  decorators: [
    Story => (
      <div style={{ height: `calc(100vh - 2rem)` }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'features/post/PostCard',
} satisfies Meta<typeof PostCard>;

export default meta;

// @ts-ignore
type Story<T> = StoryObj<typeof meta, T>;

export const getMockPublicPostCommentsWithAnswers = (count: number, withAvatar?: boolean) =>
  getMockPublicPCWA(count, withAvatar).map(comment => ({
    ...comment,
    answers: getMockPublicPCWA(count, withAvatar),
  }));

export const Public: Story<PublicPostCardProps> = {
  args: {
    comments: getMockPublicPostCommentsWithAnswers(5),
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
    comments: getMockPublicPostCommentsWithAnswers(5),
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
    comments: getMockPublicPostCommentsWithAnswers(5),
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
