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

export type PostCommentProps = {
  answersCount?: number;
  answersSection?: ReactNode;
  avatar?: string;
  classes?: CommentClasses;
  commentId: string;
  createdAt: string;
  id: string;
  infoSectionRender?: InfoSectionRender;
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
    classes = {},
    createdAt,
    infoSectionRender = ({ likes, time }) => [time, likes],
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
                {`${likesCount > 1 ? t.post.comment.likes : t.post.comment.like}: ${likesCount}`}
              </Typography.Semibold12>
            ) : null,
            time: (
              <Typography.SmallText className={s.infoSectionItem}>
                {relativeTime}
              </Typography.SmallText>
            ),
          })}
        </div>

        {!!answersCount && (
          <div className={cls.answersSection}>
            <Typography.Semibold12
              className={s.answersOpenButton}
              component={'button'}
              onClick={setOpenHandler}
            >
              {`${
                open ? t.post.comment.viewAnswersBth.close : t.post.comment.viewAnswersBth.open
              } (${answersCount ?? 0})`}
            </Typography.Semibold12>
            <div className={s.answersList}>{open && answersSection}</div>
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
