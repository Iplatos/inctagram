import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/shared/ui/button/button';

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'text'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'UI/button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary button',
    disabled: false,
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary button',
    disabled: false,
    variant: 'secondary',
  },
};
export const Tertiary: Story = {
  args: {
    children: 'Tertiary button',
    disabled: false,
    variant: 'tertiary',
  },
};
export const Text: Story = {
  args: {
    children: 'Text button',
    disabled: false,
    variant: 'text',
  },
};
export const FullWidth: Story = {
  args: {
    children: 'Full Width button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
};
