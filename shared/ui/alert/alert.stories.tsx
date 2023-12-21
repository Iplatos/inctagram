import { Button } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert';

/**
 * An alert displays a short, important message in a way that attracts the user's attention.
 * An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert.
 * */
const meta = {
  argTypes: {
    action: {
      control: false,
      description: `If an \`onClose\` callback is provided and no \`action\` prop is set, a close icon is displayed.
        The action prop can be used to provide an alternative action, for example using a Button or IconButton.`,
      table: { type: { summary: 'ReactNode' } },
    },
    children: {
      description: 'The content of the component',
      table: { type: { summary: 'ReactNode' } },
    },
    onClose: {
      description: `Callback fired when the component requests to be closed. When provided and no \`action\` prop is set,
        a close icon button is displayed that triggers the callback when clicked.`,
      table: {
        type: { summary: '(event: SyntheticEvent) => void' },
      },
    },
    ref: {
      description: 'The ref is forwarded to the root element',
      table: { type: { summary: 'Ref<HTMLDivElement>' } },
    },
    severity: {
      description: 'Severity prop offers distinctive colors to alert.',
    },
  },

  component: Alert,
  decorators: [
    Story => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Alert',
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    children: 'I like pancakes!',
    severity: 'success',
  },
};

export const Error: Story = {
  args: {
    ...Success.args,
    severity: 'error',
  },
};

const longMessage =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias commodi earum harum iusto qui repellat similique ut voluptatibus. Cupiditate necessitatibus possimus saepe? A aspernatur consequuntur laudantium molestiae quidem quis!';

export const LongMessage: Story = {
  args: {
    ...Success.args,
    children: longMessage,
  },
};

export const CustomAction: Story = {
  args: {
    ...Success.args,
    action: <Button variant={'primary'}>Undo</Button>,
  },
};

export const TextOnly: Story = {
  args: {
    ...Success.args,
    onClose: undefined,
  },
};

export const LongTextOnly: Story = {
  args: {
    ...TextOnly.args,
    ...LongMessage.args,
  },
};
