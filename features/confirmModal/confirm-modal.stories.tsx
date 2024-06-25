import { Button } from '@/shared/ui/Button';
import * as CardStories from '@/shared/ui/card/card.stories';
import * as ModalCardStories from '@/shared/ui/modal-card/modal-card.stories';
import { DialogClose } from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { ConfirmModal } from './ConfirmModal';

const meta = {
  argTypes: {
    onCancel: {
      control: 'action',
    },
    onConfirm: {
      control: 'action',
    },
  },
  component: ConfirmModal,
  decorators: [CardStories.commonDecorator],
  parameters: {
    controls: {
      include: [
        'classes',
        'confirmButtonLabel',
        'denyButtonLabel',
        'disabled',
        'headerTitle',
        'onDeny',
        'onConfirm',
      ],
    },
  },
  tags: ['autodocs'],
  title: 'UI/ConfirmModal',
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const [shortText, longText] = CardStories.cardContent;

export const Basic: Story = {
  args: {
    children: shortText,
    confirmButtonLabel: 'Ok',
    denyButtonLabel: 'Cancel',
    disabled: false,
    headerTitle: 'Pretty Header',
    trigger: <Button>Open Modal</Button>,
  },
};

export const LongText: Story = {
  args: {
    ...Basic.args,
    children: longText,
  },
};

export const LongButtons: Story = {
  args: {
    ...Basic.args,
    confirmButtonLabel: 'Lorem, ipsum',
    denyButtonLabel: 'Lorem, ipsum dolor',
  },
};

export const Empty: Story = {
  args: {
    ...Basic.args,
    children: undefined,
  },
};

export const Alert: Story = {
  args: {
    ...Basic.args,
    children: (
      <>
        {shortText}
        <DialogClose asChild>
          <Button fullWidth style={{ marginTop: 24 }}>
            Ok
          </Button>
        </DialogClose>
      </>
    ),
    confirmButtonLabel: null,
    denyButtonLabel: null,
  },
};

export const LongHeader: Story = {
  args: {
    ...Basic.args,
    headerTitle: ModalCardStories.LongHeader.args.headerTitle,
  },
};
