import { Meta, StoryObj } from '@storybook/react';

import { Popover } from './index';

const meta = {
  argTypes: {
    children: {
      control: false,
      description: 'description for Popover',
    },
  },
  component: Popover,
  tags: ['autodocs'],
  title: 'UI/Popover',
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PopoverWithThumbnails: Story = {
  args: {
    children: <div>some children</div>,
  },
};

export const PopoverWithZoom: Story = {
  args: {
    children: <div>some children zoom</div>,
  },
};

export const PopoverWithCropping: Story = {
  args: {
    children: <div>some children crop</div>,
  },
};
