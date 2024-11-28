import { FC, useRef } from 'react';

import { EditOutline } from '@/assets/icons/edit-outline';
import { TrashOutline } from '@/assets/icons/trash-outline';
import {
  AddPostCommentForm,
  PostCardActionsAndSummary,
  PrivatePostComment,
} from '@/entities/post/private-card/';
import { PostCardHeader, PostCardHeaderMenuItem } from '@/entities/post/public-card/header';
import { PrivatePostCardProps } from '@/features/post/private-card';
import { useTranslation } from '@/shared/hooks';
import { ModalCard, Typography } from '@/shared/ui';

import postCardS from '@/entities/post/card/card.module.scss';

type FilteredPrivatePostCardProps = Omit<
  PrivatePostCardProps,
  'images' | 'isFollowed' | 'onCopyProfileLink' | 'onFollow' | 'onUnfollow'
>;

export type MyProfilePostCardContentProps = FilteredPrivatePostCardProps & {
  onDeleteMenuItemClick?: () => void;
  onEditMenuItemClick?: () => void;
};

export const MyProfilePostCardContent: FC<MyProfilePostCardContentProps> = ({
  comments,
  date,
  headerProps,
  isLiked,
  likesCount,
  onAnswerLikeToggle,
  onCommentLikeToggle,
  onCommentReply,
  onDeleteMenuItemClick,
  onEditMenuItemClick,
  onPostLikeToggle,
}) => {
  const t = useTranslation().t.post.card;
  const addCommentFormRef = useRef<HTMLFormElement>(null);

  const likedUsersData = comments
    ?.slice(0, 3)
    .map(({ avatar, userName }) => ({ avatar, userName }));

  const menuItems: PostCardHeaderMenuItem[] = [
    {
      children: <Typography.Regular14>{t.header.buttons.editPost}</Typography.Regular14>,
      onClick: onEditMenuItemClick,
      startIcon: <EditOutline />,
    },
    {
      children: <Typography.Regular14>{t.header.buttons.deletePost}</Typography.Regular14>,
      onClick: onDeleteMenuItemClick,
      startIcon: <TrashOutline />,
    },
  ];

  const handleCommentAnswer = () => {
    const form = addCommentFormRef.current;

    if (form && 'comment' in form.elements) {
      const input = form.elements.comment as HTMLInputElement;

      input?.focus();
    }
  };

  return (
    <>
      <ModalCard.Header>
        <PostCardHeader menuItems={menuItems} {...headerProps} />
      </ModalCard.Header>

      <ModalCard.Content className={postCardS.commentsList}>
        {comments?.map((comment, index) => (
          <PrivatePostComment
            onAnswer={handleCommentAnswer}
            onAnswerLikeToggle={onAnswerLikeToggle}
            onCommentLikeToggle={onCommentLikeToggle}
            {...comment}
            key={index}
          />
        ))}
      </ModalCard.Content>

      <ModalCard.Content className={postCardS.privateDetails}>
        <PostCardActionsAndSummary
          date={date}
          isLiked={isLiked}
          likesCount={likesCount}
          onLikeToggle={onPostLikeToggle}
          usersData={likedUsersData}
        />
      </ModalCard.Content>

      <ModalCard.Content>
        <AddPostCommentForm
          formRef={addCommentFormRef}
          onSubmit={({ comment }) => onCommentReply?.(comment)}
          textLimit={150}
        />
      </ModalCard.Content>
    </>
  );
};
