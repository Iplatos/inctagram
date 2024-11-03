import { MouseEventHandler } from 'react';
import { DateObject } from 'react-multi-date-picker';

import { BookmarkOutline } from '@/assets/icons/bookmark-outline';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { PaperPlaneOutline } from '@/assets/icons/paper-plane-outline';
import { PostLikesSummary, PostLikesSummaryProps } from '@/entities/post/public-card';
import { IconButton, Time } from '@/shared/ui';
import clsx from 'clsx';

import s from './controls-and-summary.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type PostCardActionsAndSummaryProps = {
  date: Date | number | string;
  hideControls?: boolean;

  isLiked: boolean;
  onAddBookmark?: MouseEventHandler;
  onLikeToggle?: MouseEventHandler;
  onShare?: MouseEventHandler;
} & PostLikesSummaryProps;

export const PostCardActionsAndSummary = ({
  date,
  hideControls = false,
  isLiked,
  likesCount,
  onAddBookmark,
  onLikeToggle,
  onShare,
  usersData,
}: PostCardActionsAndSummaryProps) => {
  const dateTimeAttribute = new DateObject(new Date(date)).format('YYYY-MM-DD');

  return (
    <div className={s.root}>
      {!hideControls && (
        <div className={s.actionButtons}>
          <IconButton
            className={clsx(s.iconButtonFirst, modalCardS.headerIconButtonFirst)}
            onClick={onLikeToggle}
          >
            {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
          </IconButton>
          <IconButton className={modalCardS.headerIconButton} onClick={onShare}>
            <PaperPlaneOutline />
          </IconButton>
          <IconButton className={modalCardS.headerIconButtonLast} onClick={onAddBookmark}>
            <BookmarkOutline />
          </IconButton>
        </div>
      )}

      <div>
        <PostLikesSummary likesCount={likesCount} usersData={usersData} />
        <Time
          date={date}
          dateTime={dateTimeAttribute}
          options={{ day: 'numeric', month: 'long', year: 'numeric' }}
        />
      </div>
    </div>
  );
};
