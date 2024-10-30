import { getRandomInteger } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { PrivatePostComment, PrivatePostCommentType } from './private-post-comment';
import { getMockPublicPostComments as getMockPublicPC } from './public-post-comment.stories';

const meta = {
  component: PrivatePostComment,
  decorators: [
    Story => (
      <div style={{ maxWidth: '50ch' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getMockPrivatePostComments', 'getMockPrivatePostCommentsWithAnswers'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PrivatePostComment',
} satisfies Meta<typeof PrivatePostComment>;

export const getMockPrivatePostComments = (...args: Parameters<typeof getMockPublicPC>) =>
  getMockPublicPC(...args).map<PrivatePostCommentType>(comment => ({
    ...comment,
    isLiked: Math.random() > 0.5,
    likesCount: getRandomInteger(0, 10),
  }));

export const getMockPrivatePostCommentsWithAnswers = (
  ...args: Parameters<typeof getMockPrivatePostComments>
) =>
  getMockPrivatePostComments(...args).map<
    PrivatePostCommentType & { answers: PrivatePostCommentType[] }
  >(comment => ({
    ...comment,
    answers: getMockPrivatePostComments(...args),
  }));

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAvatar: Story = {
  args: {
    ...getMockPrivatePostComments(1, false)[0],
    isLiked: true,
    likesCount: 10,
  },
};

export const NoAnswers: Story = {
  args: {
    ...NoAvatar.args,
    ...getMockPrivatePostComments(1)[0],
  },
};

export const WithAnswers: Story = {
  args: {
    ...NoAnswers.args,
    answers: getMockPrivatePostComments(5),
  },
};
