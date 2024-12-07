import { ElementType } from 'react';

import { Typography, TypographyProps } from '@/shared/ui';
import clsx from 'clsx';

import s from './info-section-item.module.scss';
export type PostCommentInfoSectionItemProps<T extends ElementType> = {
  bold?: boolean;
} & TypographyProps<T>;

export const PostCommentInfoSectionItem = <T extends ElementType>({
  bold,
  className,
  onClick,
  ...props
}: PostCommentInfoSectionItemProps<T>) => {
  const Component = bold ? Typography.Semibold12 : Typography.SmallText;

  return (
    <Component
      className={clsx(s.item, onClick && s.itemAction, className)}
      component={onClick ? 'button' : undefined}
      onClick={onClick}
      {...props}
    />
  );
};
