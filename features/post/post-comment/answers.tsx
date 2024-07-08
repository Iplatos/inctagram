import React, { ReactNode, useState } from 'react';

import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, IconButton, Typography } from '@/shared/ui';

import s from './post-comment.module.scss';

import { PostComment } from './post-comment';

export type AnswerT = {
  avatar?: string;
  createdAt: string;
  likesCount: number;
  text: string;
  userName: string;
};

type AnswersT = {
  answers?: [] | AnswerT[];
  children?: ReactNode;
};

const Answers = (props: AnswersT) => {
  const { answers, children } = props;
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const setOpenHandler = () => setOpen(!open);

  return (
    answers &&
    answers?.length > 0 && (
      <div className={s.answers}>
        <div className={s.btnOpenAnswers}>
          <p></p>
          <Typography.Semibold12 className={s.btnOpenAnswers__title} onClick={setOpenHandler}>
            {`${open ? t.post.comment.viewAnswersBth.close : t.post.comment.viewAnswersBth.open} (${
              answers.length
            })`}
          </Typography.Semibold12>
        </div>
        <div className={s.answer__list}>{open && children}</div>
      </div>
    )
  );
};

type PublicPostAnswerT = {} & AnswersT;

export const PublicPostAnswer = (props: PublicPostAnswerT) => {
  const { answers } = props;

  return (
    <Answers answers={answers}>
      {answers?.map((answer, index) => {
        return <PostComment key={index} {...answer} />;
      })}
    </Answers>
  );
};

export type PrivateAnswerT = {
  isLiked: boolean;
  likesCount: number;
} & AnswerT;

type PrivateAnswersPostCommentT = {
  answers?: [] | PrivateAnswerT[];
  //toggleIsLiked: (isLiked: boolean) => void;
};

export const PrivateAnswersPostComment = ({ answers }: PrivateAnswersPostCommentT) => {
  const { t } = useTranslation();

  return (
    <Answers answers={answers}>
      {answers?.map((answer, index) => {
        return (
          <PostComment
            childrenInfoSection={
              <Button as={'span'} className={s.textBth} variant={'text'}>
                <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
              </Button>
            }
            iconElement={
              <IconButton className={s.iconBth} size={'small'}>
                {answer.isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
              </IconButton>
            }
            key={index}
            textWidth={s.answerTextWidth}
            {...answer}
          />
        );
      })}
    </Answers>
  );
};
