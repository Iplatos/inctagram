import { FC, ReactElement } from 'react';

import { ProfileSummary, ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { CropProps } from '@/shared/ui/croppedImage';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './profileInfo.module.scss';

type UserAvatarData = { url?: StaticImport | string } & Partial<CropProps>;

export type ProfileInfoProps = {
  aboutMe?: null | string;
  avatarProps?: UserAvatarData | null;
  className?: string;
  primaryAction?: ReactElement;
  secondaryAction?: ReactElement;
  statistics?: ProfileSummaryItem[];
  userName: string;
};

export const ProfileInfo: FC<ProfileInfoProps> = ({
  aboutMe,
  avatarProps,
  className,
  primaryAction,
  secondaryAction,
  statistics = [],
  userName,
}) => {
  // Manual destructuring to prevent unrecognized props from backend such as `updatedAt` from being passed to the internal `img` component.
  const { offsetX, offsetY, scale, url: src } = avatarProps ?? {};

  return (
    <section className={clsx(s.container, className)}>
      <Avatar classes={{ avatarRoot: s.avatar }} {...{ offsetX, offsetY, scale, src }} />
      <div className={s.header}>
        <Typography.H2 className={s.userName}>{userName}</Typography.H2>
        <div className={s.actionsGroup}>
          {primaryAction && <div className={s.actionWrapper}>{primaryAction}</div>}
          {secondaryAction && <div className={s.actionWrapper}>{secondaryAction}</div>}
        </div>
      </div>
      <ProfileSummary
        classes={{
          item: s.statsItem,
          itemName: s.statsItemName,
          itemValue: s.statsItemValue,
          items: s.statsGroup,
        }}
        summary={statistics}
      />
      <Typography.Regular16 className={s.about} component={'p'}>
        {aboutMe}
      </Typography.Regular16>
    </section>
  );
};
