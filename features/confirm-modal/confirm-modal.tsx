import { MouseEventHandler, ReactNode } from 'react';

import { Replace } from '@/shared/types/helpers';
import { Button, ButtonVariant } from '@/shared/ui/Button';
import { Modal, ModalProps } from '@/shared/ui/modal';
import { ModalCard, ModalCardProps } from '@/shared/ui/modal-card';
import clsx from 'clsx';

import s from './confirm-modal.module.scss';

type CustomButtonRenderProps = {
  children: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  variant?: ButtonVariant;
};
export type CustomButtonRender = (props: CustomButtonRenderProps) => ReactNode;
export type ConfirmModalSlot = 'button' | 'buttonsGroup';
export type ConfirmModalClasses = { [P in ConfirmModalSlot]?: string };

type OwnProps = {
  cancelButtonTitle?: string;
  children?: ReactNode;
  classes?: ConfirmModalClasses;

  confirmButtonTitle?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  renderCancelButton?: CustomButtonRender;
  renderConfirmButton?: CustomButtonRender;
};

type PickedModalCardProps = Pick<ModalCardProps, 'disabled' | 'headerTitle'>;
// prettier-ignore
export type ConfirmModalProps = Replace<
  Omit<Omit <ModalProps, "onOpenChange" > & PickedModalCardProps, 'classes' >,
  OwnProps
>;

export const ConfirmModal = ({
  cancelButtonTitle = 'No',
  children,
  classes = {},
  confirmButtonTitle = 'Yes',
  disabled,
  headerTitle,
  onCancel,
  onConfirm,
  renderCancelButton: CancelButtonComponent = Button,
  renderConfirmButton: ConfirmButtonComponent = Button,
  ...props
}: ConfirmModalProps) => {
  const cls = getClassNames(classes);

  return (
    <Modal.Root classes={{ content: s.modalContent }} {...props}>
      <ModalCard.Root
        classes={{ cardRoot: s.cardRoot }}
        disabled={disabled}
        headerTitle={headerTitle}
        onClose={onCancel}
        style={{ overflow: 'auto' }}
      >
        <ModalCard.Content className={s.cardContent}>
          {children}

          <div className={cls.buttonsGroup}>
            <Modal.Close asChild>
              <ConfirmButtonComponent
                className={cls.button}
                disabled={disabled}
                onClick={onConfirm}
                variant={'tertiary'}
              >
                {confirmButtonTitle}
              </ConfirmButtonComponent>
            </Modal.Close>

            <Modal.Close asChild>
              <CancelButtonComponent className={cls.button} disabled={disabled} onClick={onCancel}>
                {cancelButtonTitle}
              </CancelButtonComponent>
            </Modal.Close>
          </div>
        </ModalCard.Content>
      </ModalCard.Root>
    </Modal.Root>
  );
};

const getClassNames = (classes: ConfirmModalClasses): ConfirmModalClasses => ({
  button: clsx(s.button, classes.button),
  buttonsGroup: clsx(s.buttonsGroup, classes.buttonsGroup),
});
