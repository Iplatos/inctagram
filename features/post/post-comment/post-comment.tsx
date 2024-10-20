import React, { ReactNode, useState } from 'react';

import { extractInitials } from '@/shared/helpers';
import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-comment.module.scss';

export type CommentSlot =
  | 'answerSection'
  | 'bottomSection'
  | 'commentRoot'
  | 'primaryAction'
  | 'sectionComment';
export type CommentClasses = { [P in CommentSlot]?: string };

export type PostCommentProps = {
  answersCount?: number;
  answersSection?: ReactNode;
  avatar?: string;
  bottomSection?: ReactNode;
  classes?: CommentClasses;
  commentId: string;
  createdAt: string;
  id: string;
  likesCount: number;
  primaryAction?: ReactNode;
  text: string;
  userName: string;
};

export const PostComment = (props: PostCommentProps) => {
  const {
    answersCount,
    answersSection,
    avatar,
    bottomSection,
    classes = {},
    createdAt,
    likesCount,
    primaryAction,
    text,
    userName,
  } = props;
  const relativeTime = useRelativeTime(createdAt);
  const { t } = useTranslation();

  const cls = getClassNames(classes);

  const [open, setOpen] = useState<boolean>(false);
  const setOpenHandler = () => setOpen(!open);

  return (
    <div className={cls.commentRoot}>
      <div className={cls.sectionComment}>
        <Avatar
          classes={{ avatarRoot: s.commentAvatar }}
          fallback={extractInitials(userName)}
          size={'small'}
          src={avatar}
        />
        <div className={s.commentBody}>
          <div className={s.commentBodyText}>
            <Typography.Bold14>{userName}</Typography.Bold14>
            <Typography.Regular14>{' ' + text}</Typography.Regular14>
          </div>
          <div className={s.commentBodyInfo}>
            <Typography.SmallText>{relativeTime}</Typography.SmallText>
            {likesCount > 0 && (
              <Typography.Semibold12>
                {`${likesCount > 1 ? t.post.comment.likes : t.post.comment.like}: ${likesCount}`}
              </Typography.Semibold12>
            )}
            <div className={cls.bottomSection}>{bottomSection}</div>
          </div>
        </div>
        <div className={cls.primaryAction}>{primaryAction}</div>
      </div>
      {!!answersCount && (
        <div className={cls.answerSection}>
          <div className={s.btnOpenAnswers}>
            <p></p>
            <Typography.Semibold12 className={s.btnOpenAnswersTitle} onClick={setOpenHandler}>
              {`${
                open ? t.post.comment.viewAnswersBth.close : t.post.comment.viewAnswersBth.open
              } (${answersCount ?? 0})`}
            </Typography.Semibold12>
          </div>
          <div className={s.answersList}>{open && answersSection}</div>
        </div>
      )}
    </div>
  );
};

const getClassNames = (classes: CommentClasses): Required<CommentClasses> => ({
  answerSection: clsx(s.answersSection, classes.answerSection),
  bottomSection: clsx(s.bottomSection, classes.bottomSection),
  commentRoot: clsx(s.root, classes.commentRoot),
  primaryAction: clsx(s.primaryAction, classes.primaryAction),
  sectionComment: clsx(s.comment, classes.sectionComment),
});
