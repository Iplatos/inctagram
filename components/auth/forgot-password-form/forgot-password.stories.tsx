import type { Meta, StoryObj } from '@storybook/react';

import { ForgotPasswordForm } from '.';

const meta = {
  argTypes: {},
  component: ForgotPasswordForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  title: 'Auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
