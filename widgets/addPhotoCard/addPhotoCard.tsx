import { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { CloseIcon } from '@/assets/icons/close';
import { Button, IconButton, ModalCard, Typography } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

import s from './addPhotoCard.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type AddPhotoCardProps = {
  disabled?: boolean;
  error: null | string;
  onClose?: () => void;
  onFileInputChange?: ChangeEventHandler<HTMLInputElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  title: string;
};

export const AddPhotoCard: FC<AddPhotoCardProps> = ({
  disabled,
  error,
  onClose,
  onFileInputChange,
  onSecondaryClick,
  primaryButtonTitle = 'Primary',
  secondaryButtonTitle = 'Secondary',
  title,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <ModalCard className={s.root}>
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

      <ModalCard.Content className={clsx(s.content, modalCardS.contentScrollable)}>
        {error && (
          <Alert classes={{ alertRoot: s.error }} severity={'error'}>
            {error}
          </Alert>
        )}

        <div className={s.adaptivePaddingBox}>
          <div className={s.placeholderBackground}>
            <AvatarFallback className={s.placeholderIcon} />
          </div>

          <div className={s.buttonsGroup}>
            <Button
              className={s.button}
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              tabIndex={0}
            >
              {primaryButtonTitle}
              {/* TODO: Move file input to a separate file */}
            </Button>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
            {onSecondaryClick && (
              <Button
                className={s.button}
                disabled={disabled}
                onClick={onSecondaryClick}
                variant={'tertiary'}
              >
                {secondaryButtonTitle}
              </Button>
            )}
          </div>
        </div>
      </ModalCard.Content>
    </ModalCard>
  );
};
