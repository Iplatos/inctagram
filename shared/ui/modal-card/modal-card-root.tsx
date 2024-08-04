import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Replace } from '@/shared/types/helpers';
import { IconButton } from '@/shared/ui/IconButton';
import { Card } from '@/shared/ui/card';
import { Typography } from '@/shared/ui/typography';
import { DialogClose } from '@radix-ui/react-dialog';
import clsx from 'clsx';

import s from './modal-card-root.module.scss';

export type ModalCardSlot = 'cardRoot' | 'closeButton' | 'header' | 'title';
export type ModalCardClasses = { [P in ModalCardSlot]?: string };
type OwnProps = {
  classes?: ModalCardClasses;
  disabled?: boolean;
  // `title` is reserved as a global html attribute
  headerTitle: string;
  onClose?: () => void;
};
type OmittedDivElementProps = Omit<ComponentPropsWithoutRef<'div'>, 'className'>;

export type ModalCardProps = Replace<OmittedDivElementProps, OwnProps>;

export const ModalCardRoot = forwardRef<ElementRef<'div'>, ModalCardProps>(
  ({ children, classes = {}, disabled, headerTitle, onClose, ...props }, ref) => {
    const cls = getClassNames(classes);

    return (
      <Card className={cls.cardRoot} {...props} ref={ref}>
        <Card.Header className={cls.header}>
          <Typography.H1 className={cls.title} component={'h2'}>
            {headerTitle}
          </Typography.H1>

          <DialogClose asChild>
            <IconButton className={cls.closeButton} disabled={disabled} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogClose>
        </Card.Header>
        {children}
      </Card>
    );
  }
);

export const ModalCardContent = Card.Content;

export const ModalCard = Object.assign(ModalCardRoot, {
  Content: ModalCardContent,
  Root: ModalCardRoot,
});

const getClassNames = (classes: ModalCardClasses): ModalCardClasses => ({
  cardRoot: clsx(s.root, classes.cardRoot),
  closeButton: clsx(s.closeButton, classes.closeButton),
  header: clsx(s.header, classes.header),
  title: clsx(s.title, classes.title),
});
