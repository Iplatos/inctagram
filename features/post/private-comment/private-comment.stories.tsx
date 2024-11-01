import { getMockPublicPostComments as getMockPublicPC } from '@/features/post/comment/comment.stories';
import { Meta, StoryObj } from '@storybook/react';

import { PrivatePostComment, PrivatePostCommentType } from './private-comment';

const meta = {
  component: PrivatePostComment,
  decorators: [
    Story => (
      <div style={{ maxWidth: '50ch' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getMockPrivatePostComments'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PrivateComment',
} satisfies Meta<typeof PrivatePostComment>;

export const getMockPrivatePostComments = (...args: Parameters<typeof getMockPublicPC>) =>
  getMockPublicPC(...args).map<PrivatePostCommentType>(comment => ({
    ...comment,
    isLiked: Math.random() > 0.5,
  }));

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAvatar: Story = {
  args: {
    ...getMockPrivatePostComments(1, false)[0],
  },
};

export const NoAnswers: Story = {
  args: {
    ...getMockPrivatePostComments(1)[0],
  },
};

export const WithAnswers: Story = {
  args: {
    ...NoAnswers.args,
    answers: getMockPrivatePostComments(5),
  },
};
