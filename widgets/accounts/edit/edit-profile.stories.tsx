import type { Meta, StoryObj } from '@storybook/react';

import { EditProfile } from './edit-profile';

const meta = {
  argTypes: {},
  component: EditProfile,
  parameters: {
    nextRouter: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  title: 'Accounts/Edit/EditProfile',
} satisfies Meta<typeof EditProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
