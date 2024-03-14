import React, { ComponentProps, ReactNode } from 'react';

import { Typography } from '@/shared/ui/typography';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import Image from 'next/image';

import style from './modal.module.scss';

import CloseUrl from '../../assets/icons/close.svg?url';

export type ModalProps = {
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
  open: boolean;
  showCloseButton?: boolean;
  title?: string;
} & ComponentProps<'div'>;

export const Modal = (props: ModalProps) => {
  const { children, className, onClose, open, showCloseButton, title } = props;

  function handleModalClosed() {
    onClose?.();
  }

  return (
    <Dialog onOpenChange={handleModalClosed} open={open}>
      {open && (
        <DialogPortal forceMount>
          <DialogOverlay asChild className={style.dialogOverlay} />
          <DialogContent
            asChild
            className={className ? `${style.dialogContent} ${className}` : style.dialogContent}
            forceMount
          >
            <div>
              <div className={style.titleBlock}>
                <DialogTitle asChild>
                  <Typography.H1>{title}</Typography.H1>
                </DialogTitle>

                {showCloseButton && (
                  <DialogClose aria-label={'Close'} className={style.closeButton}>
                    <Image alt={'closeModal'} src={CloseUrl} />
                  </DialogClose>
                )}
              </div>

              <div className={style.contentBlock}>{children}</div>
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};

export const CloseDialog = DialogClose;
