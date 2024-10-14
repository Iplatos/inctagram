import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { resolveImageSrcToString } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { PublicPostComment, PublicPostCommentProps } from './public-post-comment';

const meta = {
  component: PublicPostComment,
  excludeStories: ['getPublicPostComments'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PublicPostComment',
} satisfies Meta<typeof PublicPostComment>;

export const getPublicPostComments = (count: number, withAvatar: boolean = true) =>
  new Array(count).fill(0).map<PublicPostCommentProps>((_, index) => ({
    avatar: withAvatar ? resolveImageSrcToString(MockUserAvatar) : undefined,
    commentId: index.toString(),
    createdAt: new Date().toString(),
    id: index.toString(),
    likesCount: Math.round(Math.random() * 10),
    text: 'This is a sample comment text.',
    userName: 'John Doe',
  }));

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAvatar: Story = {
  args: {
    ...getPublicPostComments(1, false)[0],
  },
};
export const NoAnswers: Story = {
  args: {
    ...getPublicPostComments(1)[0],
  },
};

export const WithAnswers: Story = {
  args: {
    ...NoAnswers.args,
    answers: getPublicPostComments(5),
  },
};
