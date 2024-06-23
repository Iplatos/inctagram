import TestImage from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';

import { FilterPhotoCard } from './FilterPhotoCard';

const meta = {
  argTypes: {},
  component: FilterPhotoCard,
  tags: ['autodocs'],
  title: 'UI/FilterPhotoCard',
} satisfies Meta<typeof FilterPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { onNextClick: () => {}, onPrevClick: () => {}, src: TestImage.src },
};
