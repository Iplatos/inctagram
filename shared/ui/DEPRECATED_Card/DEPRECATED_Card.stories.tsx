import { Meta, StoryObj } from '@storybook/react';

import { DEPRECATED_Card } from './DEPRECATED_Card';

const meta = {
  component: DEPRECATED_Card,
  tags: ['autodocs'],
  title: 'Components/DEPRECATED_Card',
} satisfies Meta<typeof DEPRECATED_Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'text test',
  },
};
