import React, { ReactNode } from 'react';

import { BookmarkOutline } from '@/assets/icons/bookmark-outline';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { PaperPlaneOutline } from '@/assets/icons/paper-plane-outline';
import { DateFormatter, useDateFormat } from '@/shared/hooks/useDateFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, IconButton, Typography } from '@/shared/ui';
import { useRouter } from 'next/router';

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
  const { locale } = useRouter();
  const { t } = useTranslation();

  const customDateTimeFormatter: DateFormatter = parts => {
    const date = new Date(createdAt);

    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const formattedDate = useDateFormat(
    { day: 'numeric', month: 'long', year: 'numeric' },
    customDateTimeFormatter
  );

  const formatNumberWithSpaces = (num: number | string): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const getInitials = (userName: string): string => {
    const words = userName.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());

    return initials.join('');
  };

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
                  fallback={getInitials(item.userName)}
                  key={index}
                  size={'small'}
                  src={item.avatar}
                />
              ))}
          </div>
          <Typography.Regular14>
            {`${formatNumberWithSpaces(likesCount)}`}
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
