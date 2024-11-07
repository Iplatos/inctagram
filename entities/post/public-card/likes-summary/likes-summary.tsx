import { FC } from 'react';

import { compartmentalize, getAbbreviation } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import { Avatar, Typography } from '@/shared/ui';
import { Trans } from '@/widgets/Trans/Trans';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import s from './likes-summary.module.scss';

export type PostLikesSummaryItem = { avatar?: StaticImport | string; userName: string };

export type PostLikesSummaryProps = {
  likesCount?: number;
  usersData?: PostLikesSummaryItem[];
};

export const PostLikesSummary: FC<PostLikesSummaryProps> = ({ likesCount = 0, usersData }) => {
  const t = useTranslation().t.post.card.info;

  return (
    <div className={s.likesSummary}>
      {usersData && (
        <div className={s.avatarsWrapper}>
          {usersData.map(({ avatar, userName }, index) => (
            <Avatar
              classes={{ avatarRoot: s.avatar }}
              fallback={getAbbreviation(userName).slice(0, 2)}
              key={index}
              size={'small'}
              src={avatar}
            />
          ))}
        </div>
      )}
      <Typography.Regular14>
        <Trans
          tags={{
            bold: ({ content }) => <Typography.Bold14>{content}</Typography.Bold14>,
            count: () => compartmentalize(likesCount),
          }}
          text={t.likes}
        />
      </Typography.Regular14>
    </div>
  );
};
