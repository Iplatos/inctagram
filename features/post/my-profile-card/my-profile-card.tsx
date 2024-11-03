import { FC, useRef } from 'react';

import { EditOutline } from '@/assets/icons/edit-outline';
import { TrashOutline } from '@/assets/icons/trash-outline';
import {
  AddPostCommentForm,
  PostCard,
  PostCardActionsAndSummary,
  PostCardHeader,
  PostCardHeaderMenuItem,
  PrivatePostComment,
} from '@/entities/post';
import { PrivatePostCardProps } from '@/features/post/private-card';
import { useTranslation } from '@/shared/hooks';
import { ModalCard, Typography } from '@/shared/ui';

import postCardS from '@/entities/post/card/card.module.scss';

// Props without handlers associated with header menu items and `isFollowed`
type FilteredPrivatePostCardProps = Omit<
  PrivatePostCardProps,
  'isFollowed' | 'onCopyProfileLink' | 'onFollow' | 'onUnfollow'
>;

export type MyProfilePostCardProps = FilteredPrivatePostCardProps & {
  onDeletePost?: () => void;
  onEditPost?: () => void;
};

export const MyProfilePostCard: FC<MyProfilePostCardProps> = ({
  comments,
  date,
  headerProps,
  images,
  isLiked,
  likesCount,
  onAnswerLikeToggle,
  onCommentLikeToggle,
  onCommentReply,
  onDeletePost,
  onEditPost,
}) => {
  const t = useTranslation().t.post.card;
  const addCommentFormRef = useRef<HTMLFormElement>(null);

  const btnNames = t.header.buttons;
  const likedUsersData = comments
    ?.slice(0, 3)
    .map(({ avatar, userName }) => ({ avatar, userName }));

  const menuItems: PostCardHeaderMenuItem[] = [
    {
      children: <Typography.Regular14>{btnNames.editPost}</Typography.Regular14>,
      onClick: onEditPost,
      startIcon: <EditOutline />,
    },
    {
      children: <Typography.Regular14>{btnNames.deletePost}</Typography.Regular14>,
      onClick: onDeletePost,
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
    <PostCard images={images}>
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
          usersData={likedUsersData}
        />
      </ModalCard.Content>

      <ModalCard.Content>
        <AddPostCommentForm
          formRef={addCommentFormRef}
          onSubmit={({ comment }) => onCommentReply(comment)}
          textLimit={150}
        />
      </ModalCard.Content>
    </PostCard>
  );
};
