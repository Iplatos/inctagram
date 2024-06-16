import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './card.module.scss';

export type TemplateCardProps = ComponentPropsWithoutRef<'div'>;

export const CardRoot = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => <div className={clsx(s.root, className)} ref={ref} {...props} />
);

export const CardContent = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => (
    <div className={clsx(s.content, className)} ref={ref} {...props} />
  )
);

export const CardHeader = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => (
    <div className={clsx(s.header, className)} ref={ref} {...props} />
  )
);

export const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Header: CardHeader,
  Root: CardRoot,
});
