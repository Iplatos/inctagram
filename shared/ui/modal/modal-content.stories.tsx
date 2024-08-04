import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { ModalProps } from './index';

export type ModalContentProps = NonNullable<ModalProps['contentProps']>;

/**
 * This is a service story that is required to populate the documentation of the
 * [Modal](?path=/docs/ui-modal--docs) component.
 *  */
const meta = {
  argTypes: {
    forceMount: {
      description: `Used to force mounting when more control is needed.
        Useful when controlling animation with React animation libraries.
        It inherits from \`portalProps\`
        (which is passed to an internal \`DialogPrimitive.Portal\`).`,
      table: { type: { summary: 'boolean' } },
    },

    onCloseAutoFocus: {
      description: `Event handler called when focus moves to the trigger after closing.
        It can be prevented by calling \`event.preventDefault\`.`,
      table: { type: { summary: '(event: Event) => void' } },
    },

    onEscapeKeyDown: {
      description: `Event handler called when the escape key is down.
        It can be prevented by calling \`event.preventDefault\`.`,
      table: { type: { summary: '(event: KeyboardEvent) => void' } },
    },

    onInteractOutside: {
      description: `Event handler called when an interaction (pointer or focus event)
        happens outside the bounds of the component.
        It can be prevented by calling \`event.preventDefault\`.`,
      table: { type: { summary: '(event: React.FocusEvent | MouseEvent | TouchEvent) => void' } },
    },

    onOpenAutoFocus: {
      description: `Event handler called when focus moves into the component after opening.
        It can be prevented by calling \`event.preventDefault\`.`,
      table: { type: { summary: '(event: Event) => void' } },
    },

    onPointerDownOutside: {
      description: `Event handler called when a pointer event occurs outside the bounds
        of the component. It can be prevented by calling \`event.preventDefault\`.`,
      table: { type: { summary: '(event: PointerDownOutsideEvent) => void' } },
    },
  },
  component: DialogPrimitive.Content,
  decorators: [
    // wrap `DialogPrimitive.Content` in `Dialog` to avoid the missing context provider error.
    Story => (
      <DialogPrimitive.Dialog>
        <Story />
      </DialogPrimitive.Dialog>
    ),
  ],
  tags: ['autodocs'],
  title: '__SERVICE_FOLDER__/Modal/ModalContent',
} satisfies Meta<ModalContentProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
