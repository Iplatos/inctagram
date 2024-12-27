import React from 'react';

import { PrivatePostCardModal } from '@/features/post/private-card-modal/private-card-modal';
import { GetCommentsResponse, GetPostByIdResponse } from '@/shared/api/posts-api';

type Props = {
  commentsData?: GetCommentsResponse;
  handleCommentCreate: ({ comment }: { comment: string }) => void;
  isOpenPost: boolean;
  onLikeToggle: () => void;
  postData: GetPostByIdResponse;
  setIsOpenPost: (isOpenPost: boolean) => void;
};

export const PublicationModal = (props: Props) => {
  const { commentsData, handleCommentCreate, isOpenPost, onLikeToggle, postData, setIsOpenPost } =
    props;

  const comments = commentsData?.items.map(item => ({
    avatar: item.from.avatars[0]?.url,
    createdAt: item.createdAt,
    isLiked: item.isLiked,
    likesCount: item.likeCount,
    text: item.content,
    userName: item.from.username,
  }));

  return (
    <PrivatePostCardModal
      comments={comments}
      date={postData.createdAt}
      headerProps={{
        avatar: postData.avatarOwner,
        userName: postData.userName,
      }}
      images={postData.images.map(item => item.url)}
      isFollowed
      isLiked={postData.isLiked}
      likesCount={postData.likesCount}
      onClose={() => setIsOpenPost(false)}
      onCommentReply={comment => handleCommentCreate({ comment })}
      onCopyProfileLink={() => console.log('Copy')}
      onFollow={() => console.log('Follow')}
      onPostLikeToggle={onLikeToggle}
      onUnfollow={() => console.log('Unfollow')}
      open={isOpenPost}
    />
  );
};
