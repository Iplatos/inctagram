import React, { ComponentProps, ReactNode, useState } from 'react';

import { Button, Typography } from '@/shared/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import Image from 'next/image';

import style from './dialog.module.scss';

import CloseUrl from '../../assets/icons/close.svg?url';

export type ModalProps = {
  children?: ReactNode;
  onClose?: () => void;
  open: boolean;
  showCloseButton?: boolean;
  title?: string;
} & ComponentProps<'div'>;

export const Modal = (props: ModalProps) => {
  const { children, onClose, open, showCloseButton, title } = props;

  function handleModalClosed() {
    onClose?.();
  }

  return (
    <Dialog onOpenChange={handleModalClosed} open={open}>
      {open && (
        <DialogPortal forceMount>
          <DialogOverlay asChild className={style.dialogOverlay} />

          <DialogContent asChild className={style.dialogContent} forceMount>
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

              <div className={style.contentBlock}>
                {children}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
                  <DialogClose asChild>
                    <Button className={style.dialogButton} variant={'primary'}>
                      OK
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};
