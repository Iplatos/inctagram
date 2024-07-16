import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FriendsHeaderPostCard } from '@/features/post/post-card/header-post-card/friends-header-post-card';
import { MyHeaderPostCard } from '@/features/post/post-card/header-post-card/my-header-post-card';
import { PostCard } from '@/features/post/post-card/post-card';
import { PrivatePostInfoSection } from '@/features/post/post-card/post-info-section';
import {
  PrivatePostComment,
  PrivatePostCommentProps,
} from '@/features/post/post-comment/privat-post-comment';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import s from './post-card.module.scss';

export type PrivatePostCardProps = {
  avatar?: string;
  comments: PrivatePostCommentProps[];
  createdAt: string;
  isFollowing?: boolean;
  isPostLiked: boolean;
  likesCount: number;
  postId: string;
  userId: string;
  userName: string;
};

export const PrivatePostCard = (props: PrivatePostCardProps) => {
  const { avatar, comments, isPostLiked, postId, userId, userName, ...res } = props;
  const { t } = useTranslation();

  const PrivatePostCardSchema = z.object({
    comment: z.string().max(150, { message: t.post.card.addNewComment.error }),
  });

  type FormValues = z.infer<typeof PrivatePostCardSchema>;

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(PrivatePostCardSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Comment submitted:', data);
    reset();
  };

  const addBookmarkPostHandler = () => console.log(['addBookmarkPostHandler', postId]);
  const sharePostHandler = () => console.log(['sharePostHandler', postId]);
  const toggleLikePostHandler = () => console.log(['toggleLikePostHandler', postId]);

  const id = 'das4d5as4d5as4dd'; //нужно взять userID пользователя и сравнить с автором поста

  const submitIsDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

  const deletePost = () => console.log('delete-post', postId);
  const openEditPostCard = () => console.log('edit-post', postId);

  const [isFollow, setIsFollowing] = useState(false);
  const setIsFollowingHandler = () => setIsFollowing(!isFollow);
  const setCopyLink = () => console.log('copy-link', postId);

  const icons = [
    {
      avatar: '',
      userName: 'Patrik Jk',
    },
    {
      avatar: '',
      userName: 'Roben',
    },
    {
      avatar: '',
      userName: 'Matias',
    },
  ];

  return (
    <PostCard
      addNewCommentForm={
        <form className={s.addNewCommentForm} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            disabled={isSubmitting}
            name={'comment'}
            placeholder={t.post.card.addNewComment.placeholder}
          />
          <Button disabled={submitIsDisabled} type={'submit'} variant={'text'}>
            {t.post.card.addNewComment.submit}
          </Button>
        </form>
      }
      comments={comments.map((comment, index) => {
        return <PrivatePostComment {...comment} key={index} />;
      })}
      header={
        id === userId ? (
          <MyHeaderPostCard
            avatar={avatar}
            deletePost={deletePost}
            openEditPostCard={openEditPostCard}
            userName={userName}
          />
        ) : (
          <FriendsHeaderPostCard
            avatar={avatar}
            isFollow={isFollow}
            setCopyLink={setCopyLink}
            toggleIsFollowing={setIsFollowingHandler}
            userName={userName}
          />
        )
      }
      infoSection={
        <PrivatePostInfoSection
          addBookmarkPost={addBookmarkPostHandler}
          icons={icons}
          isPostLiked={isPostLiked}
          sharePost={sharePostHandler}
          toggleLikePost={toggleLikePostHandler}
          {...res}
        />
      }
    />
  );
};
