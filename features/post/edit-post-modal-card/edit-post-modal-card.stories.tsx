import { EditPostModalCard } from '@/features/post';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EditPostModalCard> = {
  argTypes: {
    avatar: {
      control: { type: 'text' },
      description: 'URL of the user’s avatar or a static image import.',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Boolean flag to control the open/close state of the modal.',
    },
    setOpen: {
      action: 'setOpen',
      description: 'Function to handle the state of the modal (open/close).',
    },
    userName: {
      control: { type: 'text' },
      description: 'The name of the user displayed in the modal header.',
    },
  },
  component: EditPostModalCard,
  parameters: {
    docs: {
      description: {
        component: `
\`EditPostModalCard\` is a component that displays a modal window for editing a post. The modal includes a form for post editing, a photo gallery (viewing only), and the user’s avatar. The user can submit changes to their post and close the modal either via the "Close" button or through confirmation in a secondary modal.

### Key Features:
- Post editing form.
- Photo gallery for viewing images (no editing or selection functionality).
- Submit button for saving changes and closing the modal.
        `,
      },
    },
  },
  title: 'features/post/EditPostModalCard',
};

export default meta;
type Story = StoryObj<typeof EditPostModalCard>;

export const Default: Story = {
  args: {
    avatar:
      'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    open: true,
    setOpen: action('setOpen'),
    userName: 'John Doe',
  },
};

export const WithoutAvatar: Story = {
  args: {
    avatar: undefined,
    open: true,
    setOpen: action('setOpen'),
    userName: 'Jane Doe',
  },
};

export const ClosedModal: Story = {
  args: {
    avatar:
      'https://images.pexels.com/photos/27308308/pexels-photo-27308308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    open: false,
    setOpen: action('setOpen'),
    userName: 'John Doe',
  },
};
