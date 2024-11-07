import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { getMockPrivatePostComments } from '@/entities/post/private-card/comment/comment.stories';
import * as PublicPostCardStories from '@/features/post/public-card/public-card.stories';
import { resolveImageSrcToString } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { PrivatePostCard } from './private-card';

const meta = {
  component: PrivatePostCard,
  decorators: [
    Story => (
      <div style={{ height: 'calc(100vh - 2rem)' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getMockPrivatePostCommentsWithAnswers'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PrivateCard',
} satisfies Meta<typeof PrivatePostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const getMockPrivatePostCommentsWithAnswers = (count: number, withAvatar = true) =>
  getMockPrivatePostComments(count, withAvatar).map(comment => ({
    ...comment,
    answers: getMockPrivatePostComments(count, withAvatar),
  }));

export const CommentsWithoutAvatars: Story = {
  args: {
    ...PublicPostCardStories.CommentsWithoutAvatars.args,
    comments: getMockPrivatePostCommentsWithAnswers(10, false),
    headerProps: {
      ...PublicPostCardStories.CommentsWithoutAvatars.args.headerProps,
    },
    isFollowed: true,
  },
};

export const CommentsWithAvatars: Story = {
  args: {
    ...CommentsWithoutAvatars.args,
    comments: getMockPrivatePostCommentsWithAnswers(10),
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
