import React from 'react';

import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, IconButton, Typography } from '@/shared/ui';

import s from '@/features/post/post-comment/post-comment.module.scss';

import { PostComment, PostCommentProps } from './post-comment';

export type PrivateAnswer = {
  isLiked: boolean;
  likesCount: number;
} & Omit<PostCommentProps, 'answersSection, answersCount'>;

export type PrivatePostCommentProps = {
  answers?: PrivateAnswer[];
  isLiked: boolean;
  // toggleIsLiked: (isLiked: boolean) => void;
} & PostCommentProps;

export const PrivatePostComment = (props: PrivatePostCommentProps) => {
  const { answers, isLiked, ...res } = props;
  const { t } = useTranslation();

  return (
    <PostComment
      answersCount={answers?.length}
      answersSection={answers?.map((answer, index) => (
        <PostComment
          bottomSection={
            <Button as={'span'} className={s.textBth} variant={'text'}>
              <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
            </Button>
          }
          key={index}
          primaryAction={
            <IconButton className={s.iconBth} size={'small'}>
              {answer.isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
            </IconButton>
          }
          {...answer}
        />
      ))}
      bottomSection={
        <Button as={'span'} className={s.textBth} variant={'text'}>
          <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
        </Button>
      }
      primaryAction={
        <IconButton className={s.iconBth} size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      {...res}
    />
  );
};
