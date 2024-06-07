import { CloseIcon } from '@/assets/icons/close';
import { Button } from '@/shared/ui';
import { Typography } from '@/shared/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';

import style from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  children: ReactNode;
  className?: string;
  openConfirmModal: boolean;
  openParentModal: boolean;
  setOpenConfirmModal: (openConfirmModal: boolean) => void;
  setOpenParentModal: (open: boolean) => void;
  showCloseButton: boolean;
  title: string;
};

export const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    children,
    className,
    openConfirmModal,
    openParentModal,
    setOpenConfirmModal,
    setOpenParentModal,
    showCloseButton,
    title,
  } = props;

  const closeAllModal = () => {
    setOpenParentModal(!openParentModal);
    setOpenConfirmModal(!openConfirmModal);
  };

  return (
    <Dialog onOpenChange={closeAllModal} open={openConfirmModal}>
      {openConfirmModal && (
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
                  <div
                    aria-label={'Close'}
                    className={style.closeButton}
                    onClick={() => setOpenConfirmModal(!openConfirmModal)}
                  >
                    <CloseIcon />
                  </div>
                )}
              </div>

              <div className={style.contentBlock}>
                {children}
                <div className={style.buttonBlock}>
                  <Button onClick={closeAllModal} variant={'tertiary'}>
                    Discard
                  </Button>
                  <Button onClick={() => setOpenConfirmModal(!openConfirmModal)}>Save draft</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};
