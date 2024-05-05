import { FC } from 'react';

import s from './user-profile.module.scss';

import { PostsList, PostsListProps } from '../posts-list';
import { ProfileInfo, ProfileInfoProps } from '../profile-info';

type UserProfileProps = Omit<ProfileInfoProps & PostsListProps, 'className'>;

export const UserProfile: FC<UserProfileProps> = ({ posts, ...props }) => {
  return (
    <>
      <ProfileInfo {...props} className={s.wrapper} />
      <PostsList posts={posts} />
    </>
  );
};
