import { Button } from '@/shared/ui/Button';
import { Meta, StoryObj } from '@storybook/react';

import { UserBanner } from './user-banner';

const meta: Meta<typeof UserBanner> = {
  argTypes: {
    avatarProps: {
      description: 'Props passed to the underlying `Avatar` component',
      table: { type: { summary: "Omit<AvatarProps, 'alt' | 'classes'>" } },
    },
    link: {
      description:
        'If passed, the nested avatar and username will be wrapped with a `Next/Link` component.',
      table: { type: { summary: 'string' } },
    },
    userName: {
      description: 'Name of the user.',
    },
  },
  component: UserBanner,
  decorators: [
    Story => (
      <div style={{ maxWidth: '20ch' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/UserBanner',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { userName: 'UserName' } };

export const WithLink: Story = {
  args: {
    link: '/',
    userName: 'UserName',
  },
};

export const LongUserName: Story = {
  args: {
    userName: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  },
};
