import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { ModalProps } from './index';

export type ModalPortalProps = NonNullable<ModalProps['portalProps']>;

/**
 * This is a service story that is required to populate the documentation of the
 * [Modal](?path=/docs/ui-modal--docs) component.
 *  */
const meta = {
  argTypes: {
    container: {
      defaultValue: { summary: 'document.body' },
      description: `Specify a container element to portal the content into.`,
      table: { type: { summary: 'HTMLElement' } },
    },

    forceMount: {
      description: `Used to force mounting when more control is needed.
        Useful when controlling animation with React animation libraries.
        If used on this part, it will be inherited by \`Dialog.Overlay\` and \`Dialog.Content\`.`,
      table: { type: { summary: 'boolean' } },
    },
  },
  component: DialogPrimitive.Portal,
  decorators: [
    // wrap `DialogPrimitive.Content` in `Dialog` to avoid the missing context provider error.
    Story => (
      <DialogPrimitive.Dialog>
        <Story />
      </DialogPrimitive.Dialog>
    ),
  ],
  tags: ['autodocs'],
  title: '__SERVICE_FOLDER__/Modal/ModalPortal',
} satisfies Meta<ModalPortalProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
