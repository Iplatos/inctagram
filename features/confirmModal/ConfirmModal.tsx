import React, { ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Button, Typography } from '@/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';

import style from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  children: ReactNode;
  className?: string;
  confirmButtonLabel: string;
  denyButtonLabel: string;
  onConfirm: () => void;
  onDeny: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};

export const ConfirmModal = ({
  children,
  className,
  confirmButtonLabel,
  denyButtonLabel,
  onConfirm,
  onDeny,
  open,
  setOpen,
  title,
}: ConfirmModalProps) => {
  const closeAllModal = () => {
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogPortal>
        <DialogOverlay className={style.dialogOverlay} />
        <DialogContent
          className={className ? `${style.dialogContent} ${className}` : style.dialogContent}
        >
          <div>
            <div className={style.titleBlock}>
              <DialogTitle asChild>
                <Typography.H1>{title}</Typography.H1>
              </DialogTitle>
              <div aria-label={'Close'} className={style.closeButton} onClick={closeAllModal}>
                <CloseIcon />
              </div>
            </div>

            <div className={style.contentBlock}>
              {children}
              <div className={style.buttonBlock}>
                <Button
                  onClick={() => {
                    onDeny();
                    closeAllModal();
                  }}
                  variant={'tertiary'}
                >
                  {denyButtonLabel}
                </Button>
                <Button
                  onClick={() => {
                    onConfirm();
                    closeAllModal();
                  }}
                >
                  {confirmButtonLabel}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
