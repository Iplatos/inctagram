import { ReactNode } from 'react';

import { Replace } from '@/shared/types/helpers';
import { Button } from '@/shared/ui/Button';
import { Modal, ModalProps } from '@/shared/ui/modal';
import { ModalCard, ModalCardProps } from '@/shared/ui/modal-card';

import s from './ConfirmModal.module.scss';

type OwnProps = {
  children?: ReactNode;
  confirmButtonLabel?: null | string;
  denyButtonLabel?: null | string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

// TODO: remap slot names for better readability
// TODO: rename related files to lower-kebab-case

type PickedModalCardProps = Pick<ModalCardProps, 'disabled' | 'headerTitle'>;
// prettier-ignore
type ConfirmModalProps = Replace<
  Omit<ModalProps & PickedModalCardProps, 'classes'>,
  OwnProps
>;

export const ConfirmModal = ({
  children,
  confirmButtonLabel = 'Ok',
  denyButtonLabel = 'Cancel',
  disabled,
  headerTitle,
  onCancel,
  onConfirm,
  ...props
}: ConfirmModalProps) => {
  const handleConfirmClick = () => {
    onConfirm?.();
    props.onOpenChange?.(false);
  };

  const handleDenyClick = () => {
    onCancel?.();
    props.onOpenChange?.(false);
  };

  return (
    <Modal.Root classes={{ content: s.modalContent }} {...props}>
      <ModalCard.Root
        classes={{ cardRoot: s.cardRoot }}
        disabled={disabled}
        headerTitle={headerTitle}
        onClose={() => props.onOpenChange?.(false)}
        style={{ overflow: 'auto' }}
      >
        <ModalCard.Content className={s.cardContent}>
          {children}

          <div className={s.buttonsGroup}>
            {confirmButtonLabel && (
              <Modal.Close asChild>
                <Button
                  className={s.button}
                  disabled={disabled}
                  onClick={handleConfirmClick}
                  variant={'tertiary'}
                >
                  {confirmButtonLabel}
                </Button>
              </Modal.Close>
            )}
            {denyButtonLabel && (
              <Modal.Close asChild>
                <Button className={s.button} disabled={disabled} onClick={handleDenyClick}>
                  {denyButtonLabel}
                </Button>
              </Modal.Close>
            )}
          </div>
        </ModalCard.Content>
      </ModalCard.Root>
    </Modal.Root>
  );
};
