import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './TemplateCard.module.scss';

export type TemplateCardProps = ComponentPropsWithoutRef<'div'>;

export const TemplateCardRoot = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => <div className={clsx(s.root, className)} ref={ref} {...props} />
);

export const TemplateCardContent = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => (
    <div className={clsx(s.content, className)} ref={ref} {...props} />
  )
);

export const TemplateCardHeader = forwardRef<ElementRef<'div'>, TemplateCardProps>(
  ({ className, ...props }, ref) => (
    <div className={clsx(s.header, className)} ref={ref} {...props} />
  )
);

export const TemplateCard = Object.assign(TemplateCardRoot, {
  Content: TemplateCardContent,
  Header: TemplateCardHeader,
  Root: TemplateCardRoot,
});
