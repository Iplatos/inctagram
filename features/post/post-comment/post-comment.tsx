import React, { ReactNode } from 'react';

import useRelativeTime from '@/shared/hooks/useRelativeTime';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './post-comment.module.scss';

export type PostCommentT = {
  avatar?: string;
  children?: ReactNode;
  childrenInfoSection?: ReactNode;
  createdAt: string;
  iconElement?: ReactNode;
  likesCount: number;
  text: string;
  textWidth?: string;
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
    textWidth,
    userName,
  } = props;
  const relativeTime = useRelativeTime(createdAt);
  const { t } = useTranslation();

  const getInitials = (userName: string): string => {
    const words = userName.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase());

    return initials.join('');
  };

  return (
    <div className={s.root}>
      <div className={s.comment}>
        <Avatar fallback={getInitials(userName)} size={'small'} src={avatar} />
        <div className={s.body}>
          <Typography.Regular14 className={clsx(s.body__text, textWidth)}>
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
