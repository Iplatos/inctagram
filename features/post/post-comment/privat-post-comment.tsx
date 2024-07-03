import React from 'react';

import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, IconButton, Typography } from '@/shared/ui';

import s from '@/features/post/post-comment/post-comment.module.scss';

import { PrivateAnswerT, PrivateAnswersPostComment } from './answers';
import { PostComment, PostCommentT } from './post-comment';

export type PrivatePostCommentT = {
  answers?: [] | PrivateAnswerT[];
  isLiked: boolean;
  // toggleIsLiked: (isLiked: boolean) => void;
} & PostCommentT;

export const PrivatePostComment = (props: PrivatePostCommentT) => {
  const { answers, isLiked, ...res } = props;
  const { t } = useTranslation();

  return (
    <PostComment
      childrenInfoSection={
        <Button as={'span'} className={s.textBth} variant={'text'}>
          <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
        </Button>
      }
      iconElement={
        <IconButton className={s.iconBth} size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      {...res}
    >
      <PrivateAnswersPostComment answers={answers} />
    </PostComment>
  );
};
