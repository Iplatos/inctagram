import type { DialogContentProps, DialogPortalProps, DialogProps } from '@radix-ui/react-dialog';

import { ElementRef, ReactNode, Ref } from 'react';

import { PropsWithoutChildren, Replace } from '@/shared/types/helpers';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

import s from './modal-root.module.scss';

type ModalPortalProps = PropsWithoutChildren<DialogPortalProps>;
type ModalContentProps = PropsWithoutChildren<Omit<DialogContentProps, 'asChild' | 'className'>>;

export type ModalSlot = 'content' | 'overlay';
export type ModalClasses = { [P in ModalSlot]?: string };

type OwnProps = {
  children?: ReactNode;
  classes?: ModalClasses;
  contentProps?: ModalContentProps;
  contentRef?: Ref<ElementRef<typeof DialogPrimitive.Content>>;
  overlayRef?: Ref<ElementRef<typeof DialogPrimitive.Overlay>>;
  portalProps?: ModalPortalProps;
  trigger?: ReactNode;
  triggerRef?: Ref<ElementRef<typeof DialogPrimitive.Trigger>>;
};
export type ModalProps = Replace<Omit<DialogProps, 'modal'>, OwnProps>;

export const ModalRoot = ({
  children,
  classes = {},
  contentProps,
  contentRef,
  overlayRef,
  portalProps,
  trigger,
  triggerRef,
  ...props
}: ModalProps) => {
  const cls = getClassNames(classes);

  return (
    <DialogPrimitive.Root modal {...props}>
      {trigger && (
        <DialogPrimitive.Trigger asChild ref={triggerRef}>
          {trigger}
        </DialogPrimitive.Trigger>
      )}

      <DialogPrimitive.Portal {...portalProps}>
        <DialogPrimitive.Overlay className={cls.overlay} ref={overlayRef} />
        <DialogPrimitive.Content className={cls.content} ref={contentRef} {...contentProps}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const getClassNames = (classes: ModalClasses): ModalClasses => ({
  content: clsx(s.content, classes.content),
  overlay: clsx(s.overlay, classes.overlay),
});
