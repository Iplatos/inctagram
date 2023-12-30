import type { Meta, StoryObj } from '@storybook/react';

import { Devices } from './devices';

const meta = {
  argTypes: {},
  component: Devices,
  tags: ['autodocs'],
  title: 'Accounts/Edit/Devices',
} satisfies Meta<typeof Devices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
