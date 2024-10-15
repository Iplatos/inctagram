import { Button } from '@/shared/ui/Button';
import { Meta, StoryObj } from '@storybook/react';

import { UserBanner } from './user-banner';

const meta: Meta<typeof UserBanner> = {
  argTypes: {
    actions: {
      control: false,
      description: 'Actions or components to be rendered at the end of the user banner.',
    },
    avatar: {
      description: 'URL of the user avatar image.',
    },
    avatarSize: {
      description: "Size of the avatar image in 'large' | 'medium' | 'small'",
    },
    className: {
      description: 'Additional CSS class names for styling.',
    },
    name: {
      description: 'Name of the user.',
    },
  },
  component: UserBanner,
  tags: ['autodocs'],
  title: 'UI/UserBanner',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { name: 'UserName' } };

export const WithAction: Story = {
  args: {
    actions: <Button>Your component will be placed here.</Button>,
    name: 'UserName',
  },
};

export const LongUserName: Story = {
  args: {
    name: 'UserWithVeryLongNameAndSurname',
  },
};
