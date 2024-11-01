import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { getRandomInteger, resolveImageSrcToString } from '@/shared/helpers';
import { Meta, StoryObj } from '@storybook/react';

import { PostComment, PostCommentType } from './post-comment';

const meta = {
  component: PostComment,
  decorators: [
    Story => (
      <div style={{ maxWidth: '50ch' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getMockPublicPostComments'],
  tags: ['autodocs'],
  title: 'FEATURES/post/PublicPostComment',
} satisfies Meta<typeof PostComment>;

const commentText =
  // cSpell: disable-next-line
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit repellat commodi, laborum exercitationem adipisci ipsa modi dignissimos cumque? Suscipit, id! Eius asperiores, eligendi praesentium consequatur mollitia rerum nemo consequuntur deleniti qui minima ullam, veritatis hic. Ab, laudantium numquam id laboriosam voluptatum sapiente consequatur quia iste recusandae corrupti repudiandae laborum?';

export const getMockPublicPostComments = (count: number, withAvatar = true) =>
  new Array(count).fill(0).map<PostCommentType>(() => ({
    avatar: withAvatar ? resolveImageSrcToString(MockUserAvatar) : undefined,
    createdAt: new Date().toString(),
    likesCount: getRandomInteger(0, 10),
    text: commentText.slice(0, getRandomInteger(20, 500)),
    userName: 'John Doe',
  }));

export default meta;
type Story = StoryObj<typeof meta>;

export const NoAvatar: Story = {
  args: {
    ...getMockPublicPostComments(1, false)[0],
  },
};
export const NoAnswers: Story = {
  args: {
    ...getMockPublicPostComments(1)[0],
  },
};

export const WithAnswers: Story = {
  args: {
    ...NoAnswers.args,
    answers: getMockPublicPostComments(5),
  },
};
