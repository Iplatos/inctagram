import { MouseEventHandler, ReactNode, useState } from 'react';

import { PostCommentInfoSectionItem } from '@/entities/post-comment';
import { getAbbreviation, transformTaggedString } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks';
import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { Avatar, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-comment.module.scss';

export type PostCommentSlot =
  | 'answersList'
  | 'answersSection'
  | 'commentBody'
  | 'commentRoot'
  | 'infoSection'
  | 'primaryAction';
export type PostCommentClasses = { [P in PostCommentSlot]?: string };

type InfoSectionItem = {
  bold?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler;
};

export type RenderPostCommentAnswer<T extends PostCommentType> = (answer: T) => ReactNode;

export type PostCommentType = {
  avatar?: string;
  createdAt: string;
  likesCount?: number;
  text: string;
  userName: string;
};

export type PostCommentProps<Answer extends PostCommentType = PostCommentType> = {
  additionalInfoItems?: InfoSectionItem[];

  answers?: Answer[];
  classes?: PostCommentClasses;
  infoSection?: ReactNode;
  primaryAction?: ReactNode;
  renderAnswer?: RenderPostCommentAnswer<Answer>;
} & PostCommentType;

const { interpolate } = transformTaggedString;

export const PostComment = <Answer extends PostCommentType>({
  additionalInfoItems = [],
  answers,
  avatar,
  classes = {},
  createdAt,
  infoSection,
  likesCount = 0,
  primaryAction,
  renderAnswer,
  text,
  userName,
}: PostCommentProps<Answer>) => {
  const t = useTranslation().t.post.comment;
  const relativeTimeString = useRelativeTime(createdAt);
  const [open, setOpen] = useState(false);

  const toggleCommentsSectionOpen = () => setOpen(open => !open);

  const cls = getClassNames(classes);
  const AnswerComponent = renderAnswer ?? PostComment;

  const resolvedInfoItems: InfoSectionItem[] = [
    { children: relativeTimeString },
    {
      bold: true,
      children: `${likesCount > 0 ? t.likes : t.like}: ${likesCount}`,
    },
    ...additionalInfoItems,
  ];

  const toggleAnswersButtonTitle = interpolate(t.viewAnswersBth[open ? 'close' : 'open'], {
    count: () => String(answers?.length),
  });

  return (
    <div className={cls.commentRoot}>
      <Avatar
        classes={{ avatarRoot: s.avatar }}
        fallback={getAbbreviation(userName).slice(0, 2)}
        size={'small'}
        src={avatar}
      />

      <div className={cls.commentBody}>
        <Typography.Regular14 component={'p'}>
          <Typography.Bold14>{userName}</Typography.Bold14> {text}
        </Typography.Regular14>

        <div className={cls.infoSection}>
          {infoSection ??
            resolvedInfoItems.map((item, index) => (
              <PostCommentInfoSectionItem key={index} {...item} />
            ))}
        </div>

        {answers?.length && (
          <div className={cls.answersSection}>
            <PostCommentInfoSectionItem
              bold
              className={s.answersOpenButton}
              onClick={toggleCommentsSectionOpen}
            >
              {toggleAnswersButtonTitle}
            </PostCommentInfoSectionItem>

            {open && (
              <div className={cls.answersList}>
                {answers?.map((answer, index) => {
                  return <AnswerComponent key={index} {...answer} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {primaryAction && <div className={cls.primaryAction}>{primaryAction}</div>}
    </div>
  );
};

const getClassNames = (classes: PostCommentClasses): Required<PostCommentClasses> => ({
  answersList: clsx(s.answersList, classes.answersList),
  answersSection: clsx(s.answersSection, classes.answersSection),
  commentBody: clsx(s.commentBody, classes.commentBody),
  commentRoot: clsx(s.commentRoot, classes.commentRoot, 'post-comment-root'),
  infoSection: clsx(s.infoSection, classes.infoSection),
  primaryAction: clsx(s.primaryAction, classes.primaryAction),
});
