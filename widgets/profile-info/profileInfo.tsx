import { FC, ReactElement } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { ProfileSummary, ProfileSummaryItem } from '@/features/profile-info/profile-summary';
import { Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/avatar';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './profileInfo.module.scss';

export type UserProfileProps = {
  aboutMe: string;
  avatarSrc?: StaticImport | string;
  primaryAction: ReactElement;
  secondaryAction?: ReactElement;
  statistics: ProfileSummaryItem[];
  userName: string;
};

export const ProfileInfo: FC<UserProfileProps> = ({
  aboutMe,
  avatarSrc,
  primaryAction,
  secondaryAction,
  statistics,
  userName,
}) => (
  <section className={s.container}>
    <Avatar
      classes={{ avatarRoot: s.avatar }}
      fallback={<AvatarFallback />}
      priority
      src={avatarSrc}
    />
    <div className={s.header}>
      <Typography.H2 className={s.userName}>{userName}</Typography.H2>
      <div className={s.actionsGroup}>
        <div className={s.actionWrapper}>{primaryAction}</div>
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
