import { ReactNode } from 'react';

import { Avatar, AvatarSize, Typography } from '@/shared/ui';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './user-banner.module.scss';

type UserBannerProps = {
  actions?: ReactNode;
  avatar?: StaticImport | string;
  avatarSize?: AvatarSize;
  className?: string;
  name: string;
};

export const UserBanner = (props: UserBannerProps) => {
  const { actions, avatar, avatarSize, className, name } = props;

  return (
    <div className={clsx(s.userBanner, className)}>
      <div className={s.userInfo}>
        <Avatar alt={`Avatar by user ${name}`} size={avatarSize || 'small'} src={avatar} />
        <Typography.Medium16 className={s.longName}>{name}</Typography.Medium16>
      </div>
      {actions}
    </div>
  );
};
