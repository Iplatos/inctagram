import { Button } from '@/shared/ui/Button';
import * as CardStories from '@/shared/ui/card/card.stories';
import { Typography } from '@/shared/ui/typography';
import { Meta, StoryObj } from '@storybook/react';

import { ConfirmModal, ConfirmModalProps, CustomButtonRender } from './confirm-modal';

type ConfirmModalPropsAndCustomArgs = ConfirmModalProps & {
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
};

const CustomRender = ({
  cancelButtonLabel,
  confirmButtonLabel,
  hideCancelButton,
  hideConfirmButton,
  renderCancelButton,
  renderConfirmButton,
  ...props
}: ConfirmModalPropsAndCustomArgs) => {
  const resolvedConfirmButtonRender: CustomButtonRender =
    renderConfirmButton ??
    (({ children, ...props }) => (
      <Button {...props} {...{ children: confirmButtonLabel || children }} />
    ));

  const resolvedCancelButtonRender: CustomButtonRender =
    renderCancelButton ??
    (({ children, ...props }) => (
      <Button {...props} {...{ children: cancelButtonLabel || children }} />
    ));

  return (
    <ConfirmModal
      {...props}
      renderCancelButton={hideCancelButton ? () => null : resolvedCancelButtonRender}
      renderConfirmButton={hideConfirmButton ? () => null : resolvedConfirmButtonRender}
    />
  );
};

/**
 * `ConfirmModal` displays a dialog with an optional notification and waits for the user
 * to either confirm or cancel the dialog. It is based on [Modal](/docs/ui-modal--docs) wrapping [ModalCard](/docs/ui-modalcard--docs).
 */
const meta = {
  argTypes: {
    cancelButtonLabel: {
      control: 'text',
      description: '_STORYBOOK_SPECIFIC_SETTING:_',
    },

    confirmButtonLabel: {
      control: 'text',
      description: '_STORYBOOK_SPECIFIC_SETTING:_',
    },

    hideCancelButton: {
      control: 'boolean',
      description: '_STORYBOOK_SPECIFIC_SETTING:_',
    },

    hideConfirmButton: {
      control: 'boolean',
      description: '_STORYBOOK_SPECIFIC_SETTING:_',
    },

    onCancel: {
      control: 'action',
    },

    onConfirm: {
      control: 'action',
    },
  },

  decorators: [
    Story => (
      <>
        <style>{`
        [role='dialog'] { max-height: 300px; }
        .description { margin-bottom: 1rem; }
        .confirm-modal-button { flex: 1 1 auto; }
      `}</style>
        <Story />
      </>
    ),
  ],

  parameters: {
    controls: {
      include: [
        'classes',
        'disabled',
        'headerTitle',
        'onCancel',
        'onConfirm',
        'hideCancelButton',
        'hideConfirmButton',
        'confirmButtonLabel',
        'cancelButtonLabel',
      ],
    },
  },

  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/ConfirmModal',
} satisfies Meta<typeof CustomRender>;

export default meta;
type Story = StoryObj<typeof meta>;

const [shortText, longText] = CardStories.cardContent;

export const Basic: Story = {
  args: {
    children: shortText,
    disabled: false,
    headerTitle: 'Pretty Header',
    hideCancelButton: false,
    hideConfirmButton: false,
    trigger: <Button>Open Modal</Button>,
  },
  // the `commonDecorator` is required in each story to manage the styles of the internal `Card` component.
  decorators: [CardStories.commonCardDecorator],
};

export const LongText: Story = {
  args: {
    ...Basic.args,
    children: longText,
  },

  decorators: [
    CardStories.commonCardDecorator,
    Story => (
      <>
        <Typography.Regular16 className={'description'} component={'p'}>
          This story intentionally shortens the height of the modal window for the overflow behavior
          test.
        </Typography.Regular16>
        <Typography.Regular16 className={'description'} component={'p'}>
          <Typography.Bold16>TIP:</Typography.Bold16> The <em>[role=&quot;dialog&quot;]</em>{' '}
          selector is used.
        </Typography.Regular16>
        <Story />
      </>
    ),
  ],
};

export const LongButtons: Story = {
  args: {
    ...Basic.args,
    cancelButtonLabel: 'Lorem ipsum dolor sit amet.',
    classes: { button: 'confirm-modal-button' },
    confirmButtonLabel: 'Lorem, ipsum',
  },

  decorators: [
    CardStories.commonCardDecorator,
    Story => (
      <>
        <Typography.Regular16 className={'description'} component={'p'}>
          If the buttons are too long, they are moved to a new line. However, `ConfirmModal` does
          not stretch them to its full length, as this can make it difficult to manage the width of
          custom button components. In this case, you should manually stretch the buttons using the
          `classes` prop.
        </Typography.Regular16>

        <Typography.Regular16 className={'description'} component={'p'}>
          <Typography.Bold16>TIP:</Typography.Bold16> In this story, each button has a{' '}
          <em>confirm-modal-button</em> class name, which you can check via devtools.
        </Typography.Regular16>

        <Story />
      </>
    ),
  ],
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    children: undefined,
  },
  decorators: [CardStories.commonCardDecorator],
};

export const AlertModal: Story = {
  args: {
    ...Basic.args,
    renderCancelButton: () => null,
    renderConfirmButton: ({ variant, ...props }) => <Button {...props} fullWidth />,
  },
  decorators: [CardStories.commonCardDecorator],
};

export const LongHeader: Story = {
  args: {
    ...Basic.args,
    headerTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  decorators: [CardStories.commonCardDecorator],
};
