import * as Dialog from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { AddPhotoCard } from './addPhotoCard';

const meta = {
  component: AddPhotoCard,
  decorators: [
    Story => (
      <div style={{ width: 'min(370px, 100%)' }}>
        {/* `Dialog.Root` is required to provide the necessary context for `Dialog.Close`  */}
        <Dialog.Root>
          <Story />
        </Dialog.Root>
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'Components/AddPhotoCard',
} satisfies Meta<typeof AddPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const longError =
  // cSpell: disable-next-line
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore tempore quos quia voluptatem quibusdam soluta omnis nesciunt nobis! Autem?';

export const Basic: Story = {
  args: {
    disabled: false,
    draft: false,
    error: null,
    title: 'Add a profile photo',
  },
};

export const WithDraft: Story = {
  args: {
    ...Basic.args,
    draft: true,
  },
};

export const WithError: Story = {
  args: {
    ...Basic.args,
    error: '<bold>Error!</bold> A photo size should be less than 10 MB',
  },
};

export const LongError: Story = {
  args: {
    ...Basic.args,
    error: longError,
  },
};
