import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { getMockPublicPostComments } from '@/entities/post/public-card/comment/comment.stories';
import { resolveImageSrcToString } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { PublicPostCard } from './public-card';

const meta = {
  component: PublicPostCard,
  decorators: [
    Story => (
      <div style={{ height: 'calc(100vh - 2rem)' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['postCardMockImages', 'getMockPublicPostCommentsWithAnswers'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PublicCard',
} satisfies Meta<typeof PublicPostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const postCardMockImages = [
  'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/27043375/pexels-photo-27043375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/27350492/pexels-photo-27350492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export const getMockPublicPostCommentsWithAnswers = (count: number, withAvatar = true) =>
  getMockPublicPostComments(count, withAvatar).map(comment => ({
    ...comment,
    answers: getMockPublicPostComments(count, withAvatar),
  }));

export const CommentsWithoutAvatars: Story = {
  args: {
    comments: getMockPublicPostCommentsWithAnswers(10, false),
    date: new Date(),
    headerProps: {
      userName: 'UserName',
    },
    images: postCardMockImages,
    isLiked: true,
    likesCount: 5,
  },
};

export const CommentsWithAvatars: Story = {
  args: {
    ...CommentsWithoutAvatars.args,
    comments: getMockPublicPostCommentsWithAnswers(10),
    headerProps: {
      ...CommentsWithoutAvatars.args.headerProps,
      avatar: resolveImageSrcToString(MockUserAvatar),
    },
  },
};

export const NoComments: Story = {
  args: {
    ...CommentsWithAvatars.args,
    comments: undefined,
  },
};
