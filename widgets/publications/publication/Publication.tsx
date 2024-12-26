import React, { ForwardedRef, Ref, forwardRef, useState } from 'react';

import { BookmarkOutline } from '@/assets/icons/bookmark-outline';
import { CopyOutline } from '@/assets/icons/copy-outline';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { MessageCircleOutline } from '@/assets/icons/message-circle-outline';
import { PaperPlaneOutline } from '@/assets/icons/paper-plane-outline';
import { PersonRemoveOutline } from '@/assets/icons/person-remove-outline';
import { ThreeDots } from '@/assets/icons/three-dots';
import { AddPostCommentForm, PostComment, PostLikesSummary } from '@/entities/post';
import { PhotoGallery } from '@/features';
import { PrivatePostCardModal } from '@/features/post/private-card-modal/private-card-modal';
import { useCreateCommentMutation } from '@/shared/api/comments-answers/comments-answers-api';
import { useGetCommentsQuery, useUpdatePostLikeStatusMutation } from '@/shared/api/posts-api';
import { PublicationI } from '@/shared/api/publications/publication-api.types';
import { useRelativeTime } from '@/shared/hooks';
import { IconButton, Typography, UserBanner } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu';
import { useRouter } from 'next/navigation';

import styles from './publication.module.scss';

type Props = {
  publication: PublicationI;
};

export const Publication = forwardRef<HTMLDivElement, Props>(({ publication }, ref) => {
  const {
    avatarOwner,
    avatarWhoLikes,
    createdAt,
    description,
    id,
    images,
    isLiked,
    ownerId,
    userName,
  } = publication;
  const relativeTimeString = useRelativeTime(createdAt);
  const router = useRouter();
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [updateLikeStatus, { isLoading: isLoadingLikeStatus }] = useUpdatePostLikeStatusMutation();
  const [createPostComment, { isLoading: isLoadingCreatedComment }] = useCreateCommentMutation();
  const { data } = useGetCommentsQuery({ postId: id });
  const commentsCount = data?.totalCount;

  const items = images.map(item => ({
    original: item.url,
  }));

  const userData = avatarWhoLikes.map(img => ({
    avatar: img,
    userName: 'Avatar',
  }));

  const handleCommentCreate = ({ comment }: { comment: string }) => {
    createPostComment({
      comment: comment,
      postId: id,
    });
    console.log(comment);
  };

  const onLikeToggle = () => {
    console.log(id);
    updateLikeStatus({ likeStatus: isLiked ? 'NONE' : 'LIKE', postId: id });
  };

  const onShare = () => {
    console.log('clicked share');
  };

  const onAddBookmark = () => {
    console.log('clicked addBookmark');
  };

  const menuItems = (
    <DropDown.Menu
      align={'end'}
      className={styles.headerDropDownContent}
      trigger={
        <IconButton>
          <ThreeDots />
        </IconButton>
      }
    >
      <DropDown.Item className={styles.headerDropDownItem}>
        <PersonRemoveOutline />
        <Typography.Regular14>Unfollow</Typography.Regular14>
      </DropDown.Item>
      <DropDown.Item>
        <CopyOutline />
        <Typography.Regular14>Copy link</Typography.Regular14>
      </DropDown.Item>
    </DropDown.Menu>
  );

  return (
    <>
      <div className={styles.publication} ref={ref}>
        <div className={styles.header}>
          <UserBanner link={avatarOwner} userName={userName} />
          <span className={styles.headerDot}></span>
          <Typography.SmallText className={styles.headerTime}>
            {relativeTimeString}
          </Typography.SmallText>
          <div className={styles.headerDropDown}>{menuItems}</div>
        </div>
        <div>
          <PhotoGallery additionalClass={styles.gallery} aspectRatio={'1 / 1'} items={items} />
        </div>
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
        {description.length !== 0 && (
          <PostComment createdAt={createdAt} text={description} userName={userName} />
        )}
        <PostLikesSummary likesCount={publication.likesCount} usersData={userData} />

        <Typography.Bold14
          as={'a'}
          className={styles.commentsCount}
          onClick={() => setIsOpenPost(true)}
        >
          View All Comments {commentsCount && commentsCount !== 0 && `(${commentsCount})`}
        </Typography.Bold14>
        <AddPostCommentForm disabled={isLoadingCreatedComment} onSubmit={handleCommentCreate} />
      </div>
      <PrivatePostCardModal
        date={createdAt}
        headerProps={{
          avatar: avatarOwner,
          userName,
        }}
        images={images.map(item => item.url)}
        isFollowed
        isLiked={isLiked}
        likesCount={publication.likesCount}
        onClose={() => setIsOpenPost(false)}
        onCommentReply={comment => handleCommentCreate({ comment })}
        onCopyProfileLink={() => console.log('Copy')}
        onFollow={() => console.log('Follow')}
        onPostLikeToggle={onLikeToggle}
        onUnfollow={() => console.log('Unfollow')}
        open={isOpenPost}
      />
    </>
  );
});
