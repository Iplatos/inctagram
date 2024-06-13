import { ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Typography } from '@/shared/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import clsx from 'clsx';

import s from './template-modal.module.scss';

export type TemplateModalProps = {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
  classNameOverlay?: string;
  contentProps?: Omit<typeof DialogContent, 'forceMount'>;
  customTitleComponent?: ReactNode;
  description?: string;
  portalProps?: typeof DialogPortal;
  title?: string;
  trigger?: ReactNode;
} & Omit<typeof Dialog, 'modal'>;

export const TemplateModal = (props: TemplateModalProps) => {
  const {
    asChild,
    children,
    className,
    classNameOverlay,
    contentProps,
    customTitleComponent,
    description,
    portalProps,
    title,
    trigger,
    ...rest
  } = props;

  return (
    <Dialog {...rest}>
      {trigger && <DialogTrigger asChild={asChild}>{trigger}</DialogTrigger>}
      <DialogPortal {...portalProps}>
        <DialogOverlay className={clsx(s.overlay, classNameOverlay)} />
        <DialogContent {...contentProps} asChild={asChild} className={clsx(s.content, className)}>
          {customTitleComponent ||
            (title && (
              <div className={s.content__title}>
                <DialogTitle>
                  <Typography.H1>{title}</Typography.H1>
                </DialogTitle>
                <DialogClose>
                  <CloseIcon className={s.content__title__closeIcon} />
                </DialogClose>
              </div>
            ))}
          {description && (
            <div className={s.content__body}>
              <DialogDescription className={s.content__body__description}>
                <Typography.Regular16>{description}</Typography.Regular16>
              </DialogDescription>
              {children}
            </div>
          )}
          {!description && children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
