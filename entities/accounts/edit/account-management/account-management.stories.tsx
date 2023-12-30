import type { Meta, StoryObj } from '@storybook/react';

import { AccountManagement } from './account-management';

const meta = {
  argTypes: {},
  component: AccountManagement,
  tags: ['autodocs'],
  title: 'Accounts/Edit/AccountManagement',
} satisfies Meta<typeof AccountManagement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
