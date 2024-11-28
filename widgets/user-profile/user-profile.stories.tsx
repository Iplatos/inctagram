import type { PostsListPropsAndCustomArgs } from '@/widgets/posts-list/postsList.stories';
import type { ProfileInfoPropsAndCustomArgs } from '@/widgets/profile-info/profileInfo.stories';
import type { Meta, StoryObj } from '@storybook/react';

import { FC } from 'react';

import { capitalise } from '@/shared/helpers';
import * as PostsListStories from '@/widgets/posts-list/postsList.stories';
import * as ProfileInfoStories from '@/widgets/profile-info/profileInfo.stories';
import { action as storybookAction } from '@storybook/addon-actions';

import { UserProfile } from './user-profile';

type UserProfilePropsAndCustomArgs = ProfileInfoPropsAndCustomArgs & PostsListPropsAndCustomArgs;

const CustomRender: FC<UserProfilePropsAndCustomArgs> = ({
  avatarProps,
  avatarSrc,
  posts: adjacentPosts,
  postsCount,
  statistics,
  ...props
}) => {
  return (
    <UserProfile
      avatarProps={{ ...avatarProps, url: avatarSrc ? avatarProps?.url : undefined }}
      posts={PostsListStories.getMockPosts(postsCount, adjacentPosts)}
      statistics={statistics.map(s => ({
        ...s,
        action: s.action ? storybookAction(`on${capitalise(s.name)}Click`) : undefined,
      }))}
      {...props}
    />
  );
};

/**
 * A widget based on [ProfileInfo](/docs/widgets-profileinfo--docs) and
 * [PostsList](/docs/widgets-postslist--docs) components.
 * Will support all their props, except for `className`,
 * as the component's layout is designed to embed it in the desired page as is,
 * complete with the necessary logic.
 */
const meta = {
  argTypes: {
    ...ProfileInfoStories.default.argTypes,
    ...PostsListStories.default.argTypes,
  },
  component: CustomRender,
  decorators: [...ProfileInfoStories.default.decorators],
  title: 'WIDGETS/UserProfile',
} satisfies Meta<UserProfilePropsAndCustomArgs>;

export default meta;
type Story = StoryObj<UserProfilePropsAndCustomArgs>;

export const UnfollowedUser: Story = {
  args: {
    ...ProfileInfoStories.UnfollowedUser.args,
    ...PostsListStories.ManyPosts.args,
  },
};

export const FollowedUser: Story = {
  args: {
    ...UnfollowedUser.args,
    ...ProfileInfoStories.FollowedUser.args,
  },
};

export const MissingAvatar: Story = {
  args: {
    ...UnfollowedUser.args,
    ...ProfileInfoStories.MissingAvatar.args,
  },
};

export const OnePost: Story = {
  args: {
    ...ProfileInfoStories.MyProfile.args,
    ...PostsListStories.OnePost.args,
  },
};

export const EmptyPosts: Story = {
  args: {
    ...ProfileInfoStories.MyProfile.args,
    ...PostsListStories.EmptyPosts.args,
  },
};
