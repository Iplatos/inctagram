import React, { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { userInfo } from 'os';

import { PostCard } from '@/features/post/post-card/post-card';
import { PrivatePostInfoSection } from '@/features/post/post-card/post-info-section';
import { PrivatePostComment, PrivatePostCommentProps } from '@/features/post/private-comment';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import s from './post-card.module.scss';

export type PrivatePostCardProps = {
  avatar?: string;
  comments: PrivatePostCommentProps[];
  createdAt: string;
  headerSection: ReactNode;
  isFollowing?: boolean;
  isPostLiked: boolean;
  likesCount: number;
  postId: string;
  userId: string;
  userName: string;
};

export const PrivatePostCard = (props: PrivatePostCardProps) => {
  const { avatar, comments, headerSection, isPostLiked, postId, ...res } = props;
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
    setValue,
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

  const addNewAnswerHandler = () => {
    setValue('comment', `@${res.userName} `);
  };

  const submitIsDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

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
        <form className={s.addNewCommentSection} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={'comment'}
            render={({ field, fieldState }) => (
              <div className={s.inputSection}>
                <input
                  {...field}
                  className={s.input}
                  placeholder={t.post.card.addNewComment.placeholder}
                />
                {fieldState.error && (
                  <span className={s.errorTitle}>{fieldState.error.message}</span>
                )}
              </div>
            )}
          />
          <Button disabled={submitIsDisabled} type={'submit'} variant={'text'}>
            {t.post.card.addNewComment.submit}
          </Button>
        </form>
      }
      classes={{ commentsDetails: s.commentDetailsPrivate }}
      commentsSection={comments.map((comment, index) => {
        return <PrivatePostComment onAnswer={addNewAnswerHandler} {...comment} key={index} />;
      })}
      headerSection={headerSection}
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
