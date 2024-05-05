import { FC, ReactElement } from 'react';

import { ProfileSummary, ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { CropProps } from '@/shared/ui/croppedImage';
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './profileInfo.module.scss';

type AvatarProps = { src?: StaticImport | string } & Partial<CropProps>;

export type ProfileInfoProps = {
  aboutMe: string;
  avatarProps: AvatarProps;
  className?: string;
  primaryAction?: ReactElement;
  secondaryAction?: ReactElement;
  statistics: ProfileSummaryItem[];
  userName: string;
};

export const ProfileInfo: FC<ProfileInfoProps> = ({
  aboutMe,
  avatarProps,
  className,
  primaryAction,
  secondaryAction,
  statistics,
  userName,
}) => (
  <section className={clsx(s.container, className)}>
    <Avatar classes={{ avatarRoot: s.avatar }} priority {...avatarProps} />
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
