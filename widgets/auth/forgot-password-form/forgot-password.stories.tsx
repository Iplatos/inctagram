import type { Meta, StoryObj } from '@storybook/react';

import { ForgotPasswordForm } from './forgot-password-form';

const meta = {
  argTypes: {},
  component: ForgotPasswordForm,
  parameters: {
    nextRouter: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  title: 'Auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
