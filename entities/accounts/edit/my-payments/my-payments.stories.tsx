import type { Meta, StoryObj } from '@storybook/react';

import { MyPayments } from './my-payments';

const meta = {
  argTypes: {},
  component: MyPayments,
  tags: ['autodocs'],
  title: 'Accounts/Edit/MyPayments',
} satisfies Meta<typeof MyPayments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
