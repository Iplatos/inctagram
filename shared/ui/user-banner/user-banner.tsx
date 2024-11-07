import { ReactElement } from 'react';

import { getAbbreviation } from '@/shared/helpers';
import { Avatar, AvatarClasses, AvatarProps } from '@/shared/ui/avatar';
import { Typography } from '@/shared/ui/typography';
import clsx from 'clsx';
import Link from 'next/link';

import s from './user-banner.module.scss';

type UserBannerSlot = 'avatarWrapper' | 'userBannerRoot' | 'userName' | 'userNameWrapper';
type UserBannerClasses = { [P in UserBannerSlot]?: string } & { avatarClasses?: AvatarClasses };

export type UserBannerProps = {
  avatarProps?: Omit<AvatarProps, 'alt' | 'classes'>;
  classes?: UserBannerClasses;
  link?: string;
  userName: string;
};

export const UserBanner = ({
  avatarProps,
  classes = {},
  link,
  userName: userNameText,
}: UserBannerProps) => {
  const cls = getClassNames(classes, !!link);

  const getElement = (children: ReactElement, className?: string) =>
    link ? (
      <Link className={className} href={link}>
        {children}
      </Link>
    ) : (
      children
    );

  const avatar = (
    <Avatar
      alt={`Avatar of the user ${userNameText}`}
      classes={cls.avatarClasses}
      fallback={getAbbreviation(userNameText).slice(0, 2)}
      size={'small'}
      {...avatarProps}
    />
  );
  const userName = (
    <Typography.Medium16 className={cls.userName}>{userNameText}</Typography.Medium16>
  );

  return (
    <div className={cls.userBannerRoot}>
      {getElement(avatar, cls.avatarWrapper)}
      {getElement(userName, cls.userNameWrapper)}
    </div>
  );
};

const getClassNames = (
  { avatarClasses, ...classes }: UserBannerClasses,
  link: boolean
): UserBannerClasses => ({
  avatarClasses: {
    ...avatarClasses,
    avatarRoot: clsx(!link && s.avatar, avatarClasses?.avatarRoot),
  },
  avatarWrapper: clsx(classes.avatarWrapper, s.avatarWrapper),
  userBannerRoot: clsx(s.root, classes.userBannerRoot),
  userName: clsx(classes.userName, !link && s.userName),
  userNameWrapper: clsx(s.userNameWrapper, classes.userNameWrapper),
});
