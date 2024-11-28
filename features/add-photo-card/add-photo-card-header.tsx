import { FC } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { IconButton, ModalCard, Typography } from '@/shared/ui';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type AddPhotoCardHeaderProps = {
  disabled?: boolean;
  onClose?: () => void;
  title: string;
};

export const AddPhotoCardHeader: FC<AddPhotoCardHeaderProps> = ({ disabled, onClose, title }) => (
  <ModalCard.Header>
    <Typography.H2 className={modalCardS.headerTitle}>{title}</Typography.H2>
    <DialogPrimitive.Close asChild>
      <IconButton
        className={modalCardS.headerIconButtonLast}
        disabled={disabled}
        onClick={onClose}
        size={'medium'}
      >
        <CloseIcon />
      </IconButton>
    </DialogPrimitive.Close>
  </ModalCard.Header>
);
