import React, { ReactNode } from 'react';

import { BookmarkOutline } from '@/assets/icons/bookmark-outline';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { PaperPlaneOutline } from '@/assets/icons/paper-plane-outline';
import { compartmentalize, getAbbreviation } from '@/shared/helpers';
import { useDateFormat } from '@/shared/hooks/useDateFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, IconButton, Typography } from '@/shared/ui';

import s from './post-info.module.scss';

type PostInfoProps = {
  actions?: ReactNode;
  createdAt: string;
  icons?: {
    avatar: string;
    userName: string;
  }[];
  likesCount: number;
};

export const PostInfoSection = (props: PostInfoProps) => {
  const { actions, createdAt, icons, likesCount } = props;
  const { t } = useTranslation();

  const formattedDate = useDateFormat(
    new Date(createdAt),
    { day: 'numeric', month: 'long', year: 'numeric' },
    (parts: Intl.DateTimeFormatPart[]) => parts.map(part => part.value).join('')
  );

  return (
    <div className={s.root}>
      {actions}
      <div className={s.postMetrics}>
        <div className={s.lickedCount}>
          <div className={s.icons}>
            {icons
              ?.slice(0, 3)
              .map((item, index) => (
                <Avatar
                  classes={{ avatarRoot: s.icon }}
                  fallback={getAbbreviation(item.userName)}
                  key={index}
                  size={'small'}
                  src={item.avatar}
                />
              ))}
          </div>
          <Typography.Regular14>
            {`${compartmentalize(likesCount)}`}
            {' "'}
            <Typography.Bold14>{t.post.card.info.likes}</Typography.Bold14>
            {'"'}
          </Typography.Regular14>
        </div>
        <Typography.SmallText className={s.time}>{formattedDate}</Typography.SmallText>
      </div>
    </div>
  );
};

export type PrivatePostInfoSectionProps = {
  addBookmarkPost: () => void;
  isPostLiked: boolean;
  sharePost: () => void;
  toggleLikePost: () => void;
} & Omit<PostInfoProps, 'actions'>;

export const PrivatePostInfoSection = (props: PrivatePostInfoSectionProps) => {
  const { addBookmarkPost, isPostLiked, sharePost, toggleLikePost, ...res } = props;

  return (
    <PostInfoSection
      actions={
        <div className={s.actionButtons}>
          <IconButton onClick={toggleLikePost}>
            {isPostLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
          </IconButton>
          <IconButton onClick={sharePost}>
            <PaperPlaneOutline />
          </IconButton>
          <IconButton onClick={addBookmarkPost}>
            <BookmarkOutline />
          </IconButton>
        </div>
      }
      {...res}
    />
  );
};
