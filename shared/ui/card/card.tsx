import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './card.module.scss';

export type CardProps = ComponentPropsWithoutRef<'div'>;

export const CardRoot = forwardRef<ElementRef<'div'>, CardProps>(({ className, ...props }, ref) => (
  <div className={clsx(s.root, className)} ref={ref} {...props} />
));

export type CardContentProps = CardProps & { ignoreHeader?: boolean };

export const CardContent = forwardRef<ElementRef<'div'>, CardContentProps>(
  ({ className, ignoreHeader, ...props }, ref) => (
    <div
      className={clsx(s.content, !ignoreHeader && s.contentAfterHeader, className)}
      ref={ref}
      {...props}
    />
  )
);

export const CardHeader = forwardRef<ElementRef<'div'>, CardProps>(
  ({ className, ...props }, ref) => (
    <div className={clsx(s.header, className)} ref={ref} {...props} />
  )
);

export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Header: CardHeader,
  Root: CardRoot,
});
