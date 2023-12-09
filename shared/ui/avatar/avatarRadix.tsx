import { FC } from 'react';

import * as Avatar from '@radix-ui/react-avatar';
import { clsx } from 'clsx';

import s from './avatar.module.scss';

export type UserAvatarRadixType = {
  className?: string;
  urlAdress: string;
};
export const AvatarRadix: FC<UserAvatarRadixType> = ({ className, urlAdress }) => {
  const classNames = {
    imgStyle: clsx(s.AvatarRoot, className),
  };

  return (
    <div className={className}>
      <Avatar.Root className={classNames.imgStyle}>
        <Avatar.Image alt={'userAvatar'} className={s.AvatarImage} src={urlAdress} />
      </Avatar.Root>{' '}
    </div>
  );
};
