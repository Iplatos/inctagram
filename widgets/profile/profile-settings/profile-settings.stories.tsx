import type { Meta, StoryObj } from '@storybook/react';

import { ProfileSettingsContent } from './profile-settings';

const meta = {
  argTypes: {},
  component: ProfileSettingsContent,
  parameters: {
    nextRouter: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  title: 'Profile/ProfileSettingsContent',
} satisfies Meta<typeof ProfileSettingsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
