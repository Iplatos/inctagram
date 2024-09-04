import { EditPostModalCard } from '@/features/post/edit-post-modal-card/index';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: EditPostModalCard,
  tags: ['autodocs'],
  title: 'Feature/Post/DescriptionPhotoCard',
} satisfies Meta<typeof EditPostModalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    setOpen: (open: boolean) => console.log(open),
    userName: 'User Name',
  },
};
