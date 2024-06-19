import React, { ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Button, ModalRoot, Typography } from '@/shared/ui';
import { CommonCardRoot } from '@/shared/ui/modal-card';

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
    <ModalRoot classes={{ content: className }} onOpenChange={setOpen} open={open}>
      <CommonCardRoot
        classes={{ cardRoot: style.cardRoot }}
        headerTitle={title}
        onClose={closeAllModal}
      >
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
      </CommonCardRoot>
    </ModalRoot>
  );
};
