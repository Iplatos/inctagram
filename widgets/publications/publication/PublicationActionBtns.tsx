import React from 'react';

import { BookmarkOutline } from '@/assets/icons/bookmark-outline';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { MessageCircleOutline } from '@/assets/icons/message-circle-outline';
import { PaperPlaneOutline } from '@/assets/icons/paper-plane-outline';
import { IconButton } from '@/shared/ui';
import { useRouter } from 'next/navigation';

import styles from '@/widgets/publications/publication/publication.module.scss';

type Props = {
  isLiked: boolean;
  isLoadingLikeStatus: boolean;
  onAddBookmark: () => void;
  onLikeToggle: () => void;
  onShare: () => void;
  ownerId: number;
};

export const PublicationActionBtns = (props: Props) => {
  const { isLiked, isLoadingLikeStatus, onAddBookmark, onLikeToggle, onShare, ownerId } = props;
  const router = useRouter();

  return (
    <div className={styles.actionBtns}>
      <IconButton disabled={isLoadingLikeStatus} onClick={onLikeToggle}>
        {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
      </IconButton>
      <IconButton onClick={onShare}>
        <PaperPlaneOutline />
      </IconButton>
      <IconButton onClick={() => router.push(`/messenger/:${ownerId}`)}>
        <MessageCircleOutline />
      </IconButton>
      <IconButton className={styles.actionBtnsLast} onClick={onAddBookmark}>
        <BookmarkOutline />
      </IconButton>
    </div>
  );
};
