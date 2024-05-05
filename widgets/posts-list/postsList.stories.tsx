import type { Meta, StoryObj } from '@storybook/react';

import { FC } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { CropProps } from '@/shared/ui/croppedImage';

import { Post, PostsList, PostsListProps } from './postsList';

export const getRandomPosts = (count: number = 0, adjacentPosts: Post[] = []) => {
  return Array(count)
    .fill(0)
    .map(() => ({ cropProps: getRandomCropProps(), src: MockUserAvatar }) as Post)
    .concat(adjacentPosts);

  function getRandomCropProps(): CropProps {
    return {
      offsetX: getRandomNumber(),
      offsetY: getRandomNumber(),
      scale: getRandomNumber() + 1,
    };
  }

  function getRandomNumber() {
    return +Math.random().toFixed(2);
  }
};

export type PostsListPropsAndCustomArgs = PostsListProps & { postsCount?: number };

const CustomRender: FC<PostsListPropsAndCustomArgs> = ({
  posts: adjacentPosts,
  postsCount = 0,
  ...props
}) => {
  const posts = getRandomPosts(postsCount, adjacentPosts);

  return <PostsList posts={posts} {...props} />;
};

const meta = {
  argTypes: {
    className: {
      description: `The class name will be applied to the underlying \`section\` component, e.g. the root container of the component`,
      table: { type: { summary: 'string' } },
    },
    posts: {
      description: `An array of posts to display.\t
      _TIP:_ You can manually fill this control with posts. In this case they will be added to the end of the list of posts
      specified by the \`postsCount\` propagation.`,
      table: { type: { summary: 'Post[]' } },
    },
    postsCount: {
      description: `STORYBOOK_SPECIFIC_SETTING: allows you to dynamically adjust the number of posts`,
      table: { type: { summary: 'number' } },
    },
  },
  component: CustomRender,
  decorators: [
    Story => (
      <div style={{ maxWidth: '972px' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['getRandomPosts'],
  tags: ['autodocs'],
  title: 'WIDGETS/PostsList',
} satisfies Meta<PostsListPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<PostsListPropsAndCustomArgs>;

export const Primary: Story = {
  args: { posts: [], postsCount: 7 },
};

export const OnePost: Story = {
  args: { ...Primary.args, postsCount: 1 },
};

export const EmptyPosts: Story = {
  args: { ...Primary.args, postsCount: 0 },
};
