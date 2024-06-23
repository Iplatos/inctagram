import { Button } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';
import UploadImg from 'assets/icons/plus-circle-outline.svg';

import { TriggerButton } from '../trigger-button/trigger-button';
import { Popover } from './index';

const meta = {
  argTypes: {
    children: {
      control: false,
      description: 'description for Popover',
    },
    trigger: { control: false },
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
    trigger: <button>Open Modal</button>,
  },
};

export const PopoverWithZoom: Story = {
  args: {
    children: <div>some children zoom</div>,
    trigger: <div>zoom</div>,
  },
};

export const PopoverWithCropping: Story = {
  args: {
    children: <div>some children crop</div>,
    trigger: <div>crop</div>,
  },
};
