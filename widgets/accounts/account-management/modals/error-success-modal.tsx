import { CloseIcon } from '@/assets/icons/close';
import { CloseDialog } from '@/features';
import { Button, IconButton, Modal, ModalCard, Typography } from '@/shared/ui';
import * as Dialog from '@radix-ui/react-dialog';

import s from './modal.module.scss';

type ErrorSuccesModalProps = {
  buttonText: string;
  contentText: string;
  headerText: string;
  onClose: () => void;
  show: boolean;
};

export const ErrorSuccessModal = (props: ErrorSuccesModalProps) => {
  return (
    <Modal open={props.show}>
      <ModalCard.Root className={s.modal}>
        <ModalCard.Header className={s.header}>
          <Typography.H1>{props.headerText}</Typography.H1>
          <Dialog.Close asChild onClick={props.onClose}>
            <IconButton size={'medium'}>
              <CloseIcon />
            </IconButton>
          </Dialog.Close>
        </ModalCard.Header>
        <ModalCard.Content className={s.content}>
          <Typography.Regular16 className={s.text}> {props.contentText}</Typography.Regular16>
          <Button className={s.button} onClick={props.onClose}>
            {props.buttonText}
          </Button>
        </ModalCard.Content>
      </ModalCard.Root>
    </Modal>
  );
};
