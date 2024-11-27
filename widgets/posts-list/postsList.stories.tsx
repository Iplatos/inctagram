import type { Meta, StoryObj } from '@storybook/react';

import { FC } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Image, Post } from '@/shared/api/posts-api';

import { PostsList, PostsListProps } from './postsList';

export const getMockPostImage = (): Image => ({
  createdAt: new Date().toString(),
  fileSize: 300_000,
  height: 300,
  uploadId: '',
  url: MockUserAvatar.src,
  width: 300,
});

export const getMockPosts = (count: number = 0, adjacentPosts: Post[] = []): Post[] => {
  const mockPost: Post = {
    createdAt: new Date().toString(),
    description: 'Post description',
    id: Date.now(),
    images: new Array(10).fill(0).map(getMockPostImage),
    isLiked: Math.random() > 0.5,
    likesCount: 10,
    owner: {},
    ownerId: Date.now(),
    updatedAt: new Date().toString(),
    userName: 'UserName',
  };

  return Array(count)
    .fill(0)
    .map(() => mockPost)
    .concat(adjacentPosts);
};

export type PostsListPropsAndCustomArgs = PostsListProps & { postsCount?: number };

const CustomRender: FC<PostsListPropsAndCustomArgs> = ({
  posts: adjacentPosts,
  postsCount = 0,
  ...props
}) => {
  const posts = getMockPosts(postsCount, adjacentPosts);

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
  excludeStories: ['getMockPosts', 'getMockPostImage'],
  tags: ['autodocs'],
  title: 'WIDGETS/PostsList',
} satisfies Meta<PostsListPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<PostsListPropsAndCustomArgs>;

export const ManyPosts: Story = {
  args: { posts: [], postsCount: 7 },
};

export const OnePost: Story = {
  args: { ...ManyPosts.args, postsCount: 1 },
};

export const EmptyPosts: Story = {
  args: { ...ManyPosts.args, postsCount: 0 },
};
