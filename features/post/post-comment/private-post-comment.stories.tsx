import { Meta, StoryObj } from '@storybook/react';

import { PrivatePostComment, PrivatePostCommentProps } from './private-post-comment';
import { getPublicPostComments } from './public-post-comment.stories';

const meta = {
  component: PrivatePostComment,
  excludeStories: ['getPrivatePostComments'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PrivatePostComment',
} satisfies Meta<PrivatePostCommentProps>;

export const getPrivatePostComments = (count: number, withAvatar: boolean = true) =>
  getPublicPostComments(count, withAvatar).map<PrivatePostCommentProps>(
    ({ answers, ...comment }) => ({
      ...comment,
      answers: answers?.map(answer => ({
        ...answer,
        isLiked: Math.random() > 0.5 ? true : false,
      })),
      isLiked: Math.random() > 0.5 ? true : false,
    })
  );

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAvatar: Story = {
  args: {
    ...getPrivatePostComments(1, false)[0],
  },
};

export const NoAnswers: Story = {
  args: {
    ...getPrivatePostComments(1)[0],
  },
};

export const WithAnswers: Story = {
  args: {
    ...NoAnswers.args,
    answers: getPrivatePostComments(5),
  },
};
