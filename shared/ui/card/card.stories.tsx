import { Card } from '@/shared/ui/card/card';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/card',
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'text test',
  },
};
