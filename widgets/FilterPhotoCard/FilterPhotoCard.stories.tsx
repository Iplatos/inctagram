import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';

import { FilterPhotoCard } from './FilterPhotoCard';

const meta = {
  argTypes: {},
  component: FilterPhotoCard,
  decorators: [
    Story => (
      <div
        style={{
          // TODO: add a description of the various possible height settings to achieve adjustable card height and automatic scrolling on overflow
          height: '90vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'WIDGETS/FilterPhotoCard',
} satisfies Meta<typeof FilterPhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { onNextClick: () => {}, onPrevClick: () => {}, src: MockUserAvatar.src },
};
