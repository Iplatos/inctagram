import { Button } from '@/shared/ui/Button';
import { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertClasses } from './alert';

// prettier-ignore
const alertClasses  = JSON.stringify({
  action: 'string',
  alertRoot: 'string',
  close: 'string',
  message: 'string',
} as AlertClasses, null, 2)

/**
 * An alert displays a short, important notification in a way that attracts the user's attention.
 * An alert can have an action, such as a close or undo button. It is rendered after the notification, at the end of the alert.
 *
 * If a simple string is passed as `children`, it can contain XML-like tags wrapping fragments of the string to automatically adjust text (under the hood, the `Trans` component is used). Available tags:
 * * `<bold></bold>` wraps text with `Typography.Bold14` making it bold.
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

    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        type: {
          detail: alertClasses,
          summary: 'AlertClasses',
        },
      },
    },

    onClose: {
      description: `Callback fired when the component requests to be closed. When provided and no \`action\` prop is set,
        a close icon button is displayed that triggers the callback when clicked.`,
      table: {
        type: { summary: '(event: SyntheticEvent) => void' },
      },
    },

    ref: {
      description: 'The ref is forwarded to the alertRoot element',
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
    children: '<bold>Attention:</bold> I like pancakes!',
    severity: 'success',
  },
};

export const Error: Story = {
  args: {
    ...Success.args,
    severity: 'error',
  },
};

// noinspection SpellCheckingInspection
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
