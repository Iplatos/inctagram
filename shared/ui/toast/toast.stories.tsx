import { useState } from 'react';

import NextIcon from '@/public/next.svg';
import { Button, Typography } from '@/shared/ui';
import { AlertProps, AlertSeverity } from '@/shared/ui/alert';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Toast, ToastClasses, ToastProps } from './toast';

const CustomRender = ({ autoCloseDelay, onClose, open: defaultOpen, ...props }: ToastProps) => {
  const [open, setOpen] = useState(false);

  // Storybook hack: cast to null if 0 is specified as an argument.
  const delay = autoCloseDelay === 0 ? null : autoCloseDelay;

  const handleClose = (reason: 'autoCloseTimeout' | 'closeButtonClick' | 'unknown') => {
    setOpen(false);
    onClose?.(reason);
  };

  return (
    <>
      {/* Modify the onClick handler to toggle the 'open' state to check the "unknown" reason argument in the onClose handler */}
      <Button onClick={() => setOpen(true)}>Toggle Toast</Button>
      <Toast autoCloseDelay={delay} onClose={handleClose} open={open} {...props} />
    </>
  );
};

const alertPropsMap: Record<'custom action' | AlertSeverity, AlertProps> = {
  'custom action': { action: <Button variant={'primary'}>Undo</Button> },
  error: { severity: 'error' },
  success: { severity: 'success' },
};

// prettier-ignore
const toastClasses  = JSON.stringify({
  action: 'string',
  alertRoot: 'string',
  close: 'string',
  message: 'string',
  toastRoot: 'string',
} as ToastClasses, null, 2)

/**
 * Toast informs users of a process that an app has performed or will perform. It shouldn't interrupt the user experience, and they don't require user input to disappear.
 *
 * Toast is based on the [Alert](/docs/ui-alert--docs) component. But it can accept custom content as well.
 * */
const meta = {
  argTypes: {
    alertProps: {
      control: 'radio',
      description: `Props provided to internal Alert component. Alert is used as Toast content
        only if no \`children\` is provided.`,
      if: { arg: 'children', truthy: false },
      mapping: alertPropsMap,
      options: Object.keys(alertPropsMap),
      table: {
        type: {
          detail: `{\n  action?: 'ReactNode',\n  severity?: 'success | error'\n}`,
          summary: 'AlertProps',
        },
      },
    },

    autoCloseDelay: {
      control: { type: 'number' },
      description: `The number of milliseconds to wait before automatically calling the \`onClose\` function.
        \`onClose\` should then set the state of the \`open\` prop to hide the Toast.
        This behavior is disabled by specifying the \`null\` value.\t
        Set \`0\` in the Storybooks control panel to simulate a \`null\` value for the autoCloseDelay parameter.`,
    },

    children: {
      control: false,
      description: `Replaces the internal Alert component, if provided.
        Use this parameter to customize the contents of the toast.`,
      table: { type: { summary: 'ReactNode' } },
    },

    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        type: {
          detail: toastClasses,
          summary: 'ToastClasses',
        },
      },
    },

    message: {
      description: `The message to display inside of the Alert component.
        It is used only if no \`children\` is provided.`,
      if: { arg: 'children', truthy: false },
    },

    onClose: {
      description: `Callback fired when the component requests to be closed.
        Typically \`onClose\` is used to set state in the parent component,
        which is used to control the Toast \`open\` prop.\t
        The \`reason\` parameter can optionally be used to control the response to onClose,
        for example ignoring \`autoCloseTimeout\`.\t
        The \`unknown\` argument is provided when the toast has been closed by changing the \`open\`
        property from the parent without waiting for onClose to be triggered.`,
    },

    open: {
      control: false,
      description: 'If `true`, the component is shown.',
    },

    ref: {
      description: 'The ref is forwarded to the toastRoot element',
      table: { type: { summary: 'Ref<HTMLDivElement>' } },
    },
  },

  component: Toast,
  decorators: [
    Story => (
      <>
        <style>{'[data-test-id="toast"] { max-height: min(40vh, 40%) }'}</style>
        <div style={{ minHeight: '200px' }}>
          <Story />
        </div>
      </>
    ),
  ],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'UI/Toast',
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: 'Hi! Check your email for a gift.',
    open: false,
  },
};

export const CustomAction: Story = {
  args: {
    ...Primary.args,
    alertProps: alertPropsMap['custom action'],
  },
};

// noinspection SpellCheckingInspection
const longMessage =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias commodi earum harum iusto qui repellat similique ut voluptatibus. Cupiditate necessitatibus possimus saepe? A aspernatur consequuntur laudantium molestiae quidem quis!';

export const LongMessage: Story = {
  args: {
    ...Primary.args,
    message: longMessage,
  },
};

export const CustomChildren: Story = {
  args: {
    ...Primary.args,
    children: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'var(--color-dark-300)',
          borderRadius: 10,
          display: 'flex',
          gap: 20,
          padding: 20,
          width: '100%',
        }}
      >
        <Image
          alt={'user avatar'}
          src={NextIcon}
          style={{ backgroundColor: 'white', borderRadius: '50%', height: 50, width: 50 }}
        />
        <Typography.Regular16>
          <Typography.RegularLink>Satan</Typography.RegularLink> has subscribed to you.
        </Typography.Regular16>
      </div>
    ),
  },
};
