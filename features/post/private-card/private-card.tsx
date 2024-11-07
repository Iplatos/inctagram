import { FC, useRef } from 'react';

import { CopyOutline } from '@/assets/icons/copy-outline';
import { PersonAddOutline } from '@/assets/icons/person-add-outline';
import { PersonRemoveOutline } from '@/assets/icons/person-remove-outline';
import {
  AddPostCommentForm,
  PostCard,
  PostCardActionsAndSummary,
  PostCardHeader,
  PostCardHeaderMenuItem,
  PostCardHeaderProps,
  PrivatePostComment,
  PrivatePostCommentType,
} from '@/entities/post';
import { useTranslation } from '@/shared/hooks';
import { ModalCard, Typography } from '@/shared/ui';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import postCardS from '@/entities/post/card/card.module.scss';

type FriendPostCardMenuKey = 'copy' | 'follow' | 'unfollow';

export type PrivatePostCommentWithAnswers = PrivatePostCommentType & {
  answers?: PrivatePostCommentType[];
};

export type PrivatePostCardProps = {
  comments?: PrivatePostCommentWithAnswers[];
  date: Date | number | string;

  headerProps: Omit<PostCardHeaderProps, 'menuItems'>;
  images: (StaticImport | string)[];
  isFollowed: boolean;
  isLiked: boolean;
  likesCount?: number;
  onAnswerLikeToggle?: () => void;
  onCommentLikeToggle?: () => void;
  onCommentReply?: (comment: string) => void;
  onCopyProfileLink: () => void;
  onFollow: () => void;
  onPostLikeToggle: () => void;
  onUnfollow: () => void;
};

export const PrivatePostCard: FC<PrivatePostCardProps> = ({
  comments,
  date,
  headerProps,
  images,
  isFollowed,
  isLiked,
  likesCount,
  onAnswerLikeToggle,
  onCommentLikeToggle,
  onCommentReply,
  onCopyProfileLink,
  onFollow,
  onPostLikeToggle,
  onUnfollow,
}) => {
  const t = useTranslation().t.post.card;
  const addCommentFormRef = useRef<HTMLFormElement>(null);

  const likedUsersData = comments
    ?.slice(0, 3)
    .map(({ avatar, userName }) => ({ avatar, userName }));

  const menuItemsKeys: FriendPostCardMenuKey[] = [isFollowed ? 'unfollow' : 'follow', 'copy'];
  const headerMenuItemKeysToItemsMap: Record<FriendPostCardMenuKey, () => PostCardHeaderMenuItem> =
    {
      copy: () => ({
        children: <Typography.Regular14>{t.header.buttons.copyLink}</Typography.Regular14>,
        onClick: onCopyProfileLink,
        startIcon: <CopyOutline />,
      }),
      follow: () => ({
        children: <Typography.Regular14>{t.header.buttons.follow}</Typography.Regular14>,
        onClick: onFollow,
        startIcon: <PersonAddOutline />,
      }),
      unfollow: () => ({
        children: <Typography.Regular14>{t.header.buttons.unfollow}</Typography.Regular14>,
        onClick: onUnfollow,
        startIcon: <PersonRemoveOutline />,
      }),
    };

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
        <PostCardHeader
          menuItems={menuItemsKeys.map(key => headerMenuItemKeysToItemsMap[key]())}
          {...headerProps}
        />
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
    </PostCard>
  );
};
