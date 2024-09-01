import * as Dialog from '@radix-ui/react-dialog';
import { Meta, StoryObj } from '@storybook/react';

import { AddPhotoCard, AddPhotoCardProps } from './addPhotoCard';

type CustomRenderProps = AddPhotoCardProps & { showSecondaryButton: boolean };

const CustomRender = ({
  onSecondaryClick: onTertiaryClick,
  showSecondaryButton,
  ...props
}: CustomRenderProps) => (
  <AddPhotoCard onSecondaryClick={showSecondaryButton ? onTertiaryClick : undefined} {...props} />
);

const meta = {
  argTypes: {
    error: { control: 'text' },
    onClose: { control: 'action' },
    onFileInputChange: { control: 'action' },
    onSecondaryClick: { control: 'action' },
    primaryButtonTitle: { control: 'text' },
    secondaryButtonTitle: { control: 'text' },
    showSecondaryButton: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div style={{ display: 'flex', maxHeight: 'calc(100vh - 2rem)', width: 'min(370px, 100%)' }}>
        {/* `Dialog.Root` is required to provide the necessary context for `Dialog.Close`  */}
        <Dialog.Root>
          <Story />
        </Dialog.Root>
      </div>
    ),
  ],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/AddPhotoCard',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const longError =
  // cSpell: disable-next-line
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore tempore quos quia voluptatem quibusdam soluta omnis nesciunt nobis! Autem?';

export const Basic: Story = {
  args: {
    disabled: false,
    error: null,
    showSecondaryButton: false,
    title: 'Add a profile photo',
  },
};

export const LongTitle: Story = {
  args: {
    ...Basic.args,
    title: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit',
  },
};

export const ShowSecondaryButton: Story = {
  args: {
    ...Basic.args,
    primaryButtonTitle: 'Lorem, ipsum dolor sit amet',
    secondaryButtonTitle: 'Lorem, ipsum dolor sit amet',
    showSecondaryButton: true,
  },
};

export const Error: Story = {
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
