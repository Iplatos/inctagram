import React, { forwardRef, useState } from 'react';

import { AddPostCommentForm, PostComment, PostLikesSummary } from '@/entities/post';
import { PhotoGallery } from '@/features';
import { Typography } from '@/shared/ui';
import { PublicationSkeleton } from '@/widgets/publications/publication.skeleton';
import { PublicationActionBtns } from '@/widgets/publications/publication/PublicationActionBtns';
import { PublicationHeader } from '@/widgets/publications/publication/PublicationHeader';
import { PublicationModal } from '@/widgets/publications/publication/PublicationModal';
import { usePublication } from '@/widgets/publications/publication/usePublication';

import styles from './publication.module.scss';

type Props = {
  publicationId: number;
};

export const Publication = forwardRef<HTMLDivElement, Props>(({ publicationId }, ref) => {
  const {
    avatarWhoLikes,
    commentsCount,
    commentsData,
    handleCommentCreate,
    isLoadingCreatedComment,
    isLoadingLikeStatus,
    onAddBookmark,
    onLikeToggle,
    onShare,
    postData,
    relativeTimeString,
  } = usePublication({ postId: publicationId });
  const [isOpenPost, setIsOpenPost] = useState(false);

  if (!postData) {
    return (
      <div className={styles.publication}>
        <PublicationSkeleton />
      </div>
    );
  }

  const postImages = postData.images.map(item => ({
    original: item.url,
  }));

  return (
    <>
      <div className={styles.publication} ref={ref}>
        <PublicationHeader postData={postData} relativeTimeString={relativeTimeString} />
        <PhotoGallery additionalClass={styles.gallery} aspectRatio={'1 / 1'} items={postImages} />
        <PublicationActionBtns
          isLiked={postData.isLiked}
          isLoadingLikeStatus={isLoadingLikeStatus}
          onAddBookmark={onAddBookmark}
          onLikeToggle={onLikeToggle}
          onShare={onShare}
          ownerId={postData.ownerId}
        />
        <PostLikesSummary likesCount={postData.likesCount} usersData={avatarWhoLikes} />
        {postData.description.length !== 0 && (
          <PostComment
            createdAt={postData.createdAt}
            text={postData.description}
            userName={postData.userName}
          />
        )}
        <Typography.Bold14
          as={'a'}
          className={styles.commentsCount}
          onClick={() => setIsOpenPost(true)}
        >
          View All Comments {commentsCount && commentsCount !== 0 && `(${commentsCount})`}
        </Typography.Bold14>
        <AddPostCommentForm disabled={isLoadingCreatedComment} onSubmit={handleCommentCreate} />
      </div>
      {isOpenPost && (
        <PublicationModal
          commentsData={commentsData}
          handleCommentCreate={handleCommentCreate}
          isOpenPost={isOpenPost}
          onLikeToggle={onLikeToggle}
          postData={postData}
          setIsOpenPost={setIsOpenPost}
        />
      )}
    </>
  );
});
