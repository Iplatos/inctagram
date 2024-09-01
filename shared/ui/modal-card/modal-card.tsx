import { ElementRef, forwardRef } from 'react';

import {
  Card,
  CardContent,
  CardContentProps,
  CardHeader,
  CardProps,
  CardRoot,
} from '@/shared/ui/card';
import clsx from 'clsx';

import s from './modal-card.module.scss';

export type ModalCardProps = CardProps;

export const ModalCardRoot = forwardRef<ElementRef<'div'>, ModalCardProps>(
  ({ className, ...props }, ref) => (
    // `Card.Root` causes the `ModalCard` web page and all related pages in the storybook
    // to crash.  However, `CardRoot` called directly works fine.
    <CardRoot className={clsx(s.root, className)} ref={ref} {...props} />
  )
);

export const ModalCardContent = CardContent;

export type ModalCardContentProps = CardContentProps;

export const ModalCardHeader = CardHeader;

export const ModalCard = Object.assign(ModalCardRoot, {
  Content: ModalCardContent,
  Header: ModalCardHeader,
  Root: ModalCardRoot,
});
