import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/shared/ui/Button/button';

const meta = {
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'text'],
    },
  },
  args: {
    disabled: false,
    fullWidth: false,
  },
  component: Button,
  tags: ['autodocs'],
  title: 'UI/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
};
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};
export const FullWidth: Story = {
  args: {
    ...Primary.args,
    children: 'Full Width Button',
    fullWidth: true,
  },
};

export const AsLink: Story = {
  args: {
    ...Primary.args,
    component: 'a',
    href: '/',
  },
};
