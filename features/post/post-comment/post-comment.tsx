import React, { ReactNode } from 'react';

import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Typography } from '@/shared/ui';

import s from './post-comment.module.scss';

export type PostCommentT = {
  avatar?: string;
  children?: ReactNode;
  childrenInfoSection?: ReactNode;
  createdAt: string;
  iconElement?: ReactNode;
  likesCount: number;
  text: string;
  userName: string;
};

export const PostComment = (props: PostCommentT) => {
  const {
    avatar,
    children,
    childrenInfoSection,
    createdAt,
    iconElement,
    likesCount,
    text,
    userName,
  } = props;
  const relativeTime = useRelativeTime(createdAt);
  const { t } = useTranslation();

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
            {likesCount > 0 && (
              <Typography.Semibold12>
                {`${likesCount > 1 ? t.post.comment.likes : t.post.comment.like}: ${likesCount}`}
              </Typography.Semibold12>
            )}
            {childrenInfoSection}
          </div>
        </div>
        {iconElement}
      </div>
      <div>{children}</div>
    </div>
  );
};
