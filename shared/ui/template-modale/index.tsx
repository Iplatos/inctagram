import * as DialogPrimitive from '@radix-ui/react-dialog';

export * from './template-modal';
import { ModalRoot } from './template-modal';

export const ModalClose = DialogPrimitive.Close;
export const ModalTitle = DialogPrimitive.Title;
export const ModalDescription = DialogPrimitive.Description;
export const ModalTrigger = DialogPrimitive.Trigger;

export const TemplateModal = Object.assign(ModalRoot, {
  Close: ModalClose,
  Description: ModalDescription,
  Root: ModalRoot,
  Title: ModalTitle,
  Trigger: ModalTrigger,
});
