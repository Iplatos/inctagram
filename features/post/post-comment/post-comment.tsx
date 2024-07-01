import React, { ReactNode, useState } from 'react';

import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Button, Typography } from '@/shared/ui';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

import s from './post-comment.module.scss';

export type PostCommentT = {
  avatar?: string;
  children?: ReactNode;
  childrenInfoSection?: ReactNode;
  createdAt: string;
  iconElement?: ReactNode;
  text: string;
  userName: string;
};

export const PostComment = (props: PostCommentT) => {
  const { avatar, children, childrenInfoSection, createdAt, iconElement, text, userName } = props;
  const relativeTime = useRelativeTime(createdAt);

  return (
    <div className={s.root}>
      <div className={s.comment}>
        <Avatar size={'small'} src={avatar} />
        <div className={s.body}>
          <Typography.Regular14 className={s.body__text}>
            <Typography.Bold14>{userName}</Typography.Bold14>
            {' ' + text}
          </Typography.Regular14>
          <div className={s.body__info}>
            <Typography.SmallText>{relativeTime}</Typography.SmallText>
            {childrenInfoSection}
          </div>
        </div>
        {iconElement}
      </div>
      <div>{children}</div>
    </div>
  );
};

export type AnswerT = {
  avatar?: string;
  createdAt: string;
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
    answers && (
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

const PublicPostAnswer = (props: PublicPostAnswerT) => {
  const { answers } = props;

  return (
    <Answers answers={answers}>
      {answers?.map((answer, index) => {
        return (
          <PostComment
            avatar={answer.avatar}
            createdAt={answer.createdAt}
            key={index}
            text={answer.text}
            userName={answer.userName}
          />
        );
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
            avatar={answer.avatar}
            childrenInfoSection={
              <>
                {answer.likesCount > 0 && (
                  <Button as={'span'} className={s.textBth} variant={'text'}>
                    <Typography.Semibold12>
                      {`${answer.likesCount > 1 ? t.post.comment.likes : t.post.comment.like}: ${
                        answer.likesCount
                      }`}
                    </Typography.Semibold12>
                  </Button>
                )}
                <Button as={'span'} className={s.textBth} variant={'text'}>
                  <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
                </Button>
              </>
            }
            createdAt={answer.createdAt}
            iconElement={
              <IconButton className={s.iconBth} size={'small'}>
                {answer.isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
              </IconButton>
            }
            key={index}
            text={answer.text}
            userName={answer.userName}
          />
        );
      })}
    </Answers>
  );
};

export type PublicPostCommentT = {
  answers?: [] | AnswerT[];
} & PostCommentT;

export const PublicPostComment = (props: PublicPostCommentT) => {
  const { answers, ...res } = props;

  return (
    <PostComment {...res}>
      <PublicPostAnswer answers={answers} />
    </PostComment>
  );
};

export type PrivatePostCommentT = {
  answers?: [] | PrivateAnswerT[];
  isLiked: boolean;
  likesCount: number;
  // toggleIsLiked: (isLiked: boolean) => void;
} & PostCommentT;

export const PrivatePostComment = (props: PrivatePostCommentT) => {
  const { answers, createdAt, isLiked, likesCount, text, userName } = props;
  const { t } = useTranslation();

  return (
    <PostComment
      childrenInfoSection={
        <>
          {likesCount > 0 && (
            <Typography.Semibold12>
              {`${likesCount > 1 ? t.post.comment.likes : t.post.comment.like}: ${likesCount}`}
            </Typography.Semibold12>
          )}
          <Button as={'span'} className={s.textBth} variant={'text'}>
            <Typography.Semibold12>{t.post.comment.answer}</Typography.Semibold12>
          </Button>
        </>
      }
      createdAt={createdAt}
      iconElement={
        <IconButton className={s.iconBth} size={'small'}>
          {isLiked ? <HeartFilled style={{ fill: 'red' }} /> : <HeartOutlined />}
        </IconButton>
      }
      text={text}
      userName={userName}
    >
      <PrivateAnswersPostComment answers={answers} />
    </PostComment>
  );
};
