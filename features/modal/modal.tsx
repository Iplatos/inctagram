import { ComponentProps, ReactNode } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Typography } from '@/shared/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';

import style from './modal.module.scss';

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
          <DialogOverlay className={style.dialogOverlay} />
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
                    <CloseIcon />
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
