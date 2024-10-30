import { ReactElement, ReactNode, useState } from 'react';

import { getAbbreviation } from '@/shared/helpers';
import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-comment.module.scss';

export type CommentSlot = 'answersSection' | 'commentRoot' | 'infoSection' | 'primaryAction';
export type CommentClasses = { [P in CommentSlot]?: string };

export type InfoSectionRender = (elements: {
  likes: ReactElement | null;
  time: ReactElement;
}) => ReactNode;

export type RenderAnswer<T extends PostCommentType> = (answer: T) => ReactNode;

export type PostCommentType = {
  avatar?: string;
  commentId: string;
  createdAt: string;
  id: string;
  likesCount: number;
  text: string;
  userName: string;
};

export type PostCommentProps<Answer extends PostCommentType = PostCommentType> = {
  answers?: Answer[];
  classes?: CommentClasses;
  infoSectionRender?: InfoSectionRender;
  primaryAction?: ReactNode;
  renderAnswer?: RenderAnswer<Answer>;
} & PostCommentType;

export const PostComment = <Answer extends PostCommentType>({
  answers,
  avatar,
  classes = {},
  createdAt,
  infoSectionRender = ({ likes, time }) => [time, likes],
  likesCount,
  primaryAction,
  renderAnswer,
  text,
  userName,
}: PostCommentProps<Answer>) => {
  const relativeTime = useRelativeTime(createdAt);
  const t = useTranslation().t.post.comment;

  const cls = getClassNames(classes);

  const [open, setOpen] = useState<boolean>(false);
  const setOpenHandler = () => setOpen(!open);

  const RenderAnswer = renderAnswer ?? PostComment;

  return (
    <div className={cls.commentRoot}>
      <Avatar
        classes={{ avatarRoot: s.avatar }}
        fallback={getAbbreviation(userName).slice(0, 2)}
        size={'small'}
        src={avatar}
      />
      <div>
        <Typography.Regular14 component={'p'}>
          <Typography.Bold14>{userName}</Typography.Bold14> {text}
        </Typography.Regular14>

        <div className={cls.infoSection}>
          {infoSectionRender({
            likes: likesCount ? (
              <Typography.Semibold12 className={s.infoSectionItem}>
                {`${likesCount > 1 ? t.likes : t.like}: ${likesCount}`}
              </Typography.Semibold12>
            ) : null,
            time: (
              <Typography.SmallText className={s.infoSectionItem}>
                {relativeTime}
              </Typography.SmallText>
            ),
          })}
        </div>

        {!!answers?.length && (
          <div className={cls.answersSection}>
            <Typography.Semibold12
              className={s.answersOpenButton}
              component={'button'}
              onClick={setOpenHandler}
            >
              {`${open ? t.viewAnswersBth.close : t.viewAnswersBth.open} (${answers.length})`}
            </Typography.Semibold12>

            {open && (
              <div className={s.answersList}>
                {answers?.map((answer, index) => {
                  return <RenderAnswer key={index} {...answer} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={cls.primaryAction}>{primaryAction}</div>
    </div>
  );
};

const getClassNames = (classes: CommentClasses): Required<CommentClasses> => ({
  answersSection: clsx(s.answersSection, classes.answersSection),
  commentRoot: clsx(s.commentRoot, classes.commentRoot),
  infoSection: clsx(s.infoSection, classes.infoSection),
  primaryAction: clsx(s.primaryAction, classes.primaryAction),
});
