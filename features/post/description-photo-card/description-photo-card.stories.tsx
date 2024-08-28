import { DescriptionPhotoCard } from '@/features/post/description-photo-card/index';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: DescriptionPhotoCard,
  tags: ['autodocs'],
  title: 'Feature/Post/DescriptionPhotoCard',
} satisfies Meta<typeof DescriptionPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    setOpen: (open: boolean) => console.log(open),
    userName: 'User Name',
  },
};
