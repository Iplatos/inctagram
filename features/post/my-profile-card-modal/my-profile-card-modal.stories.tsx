import { useState } from 'react';

import * as MyProfileCardStories from '@/features/post/my-profile-card/my-profile-card.stories';
import { Button } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';

import { MyProfilePostCardModal, MyProfilePostCardModalProps } from './my-profile-card-modal';

type CustomRenderProps = Omit<MyProfilePostCardModalProps, 'onClose' | 'open'>;

const CustomRender = (props: CustomRenderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} style={{ marginBottom: '1rem' }}>
        Open Modal
      </Button>
      <MyProfilePostCardModal onClose={() => setOpen(false)} open={open} {...props} />
    </>
  );
};

const meta = {
  decorators: [
    Story => (
      <div style={{ height: 'calc(100vh - 6rem)' }}>
        <Story />
      </div>
    ),
  ],
  render: CustomRender,
  tags: ['autodocs'],
  title: 'FEATURES/post/MyProfileCardModal',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CommentsWithoutAvatars: Story = {
  args: {
    ...MyProfileCardStories.CommentsWithoutAvatars.args,
  },
};

export const CommentsWithAvatars: Story = {
  args: {
    ...MyProfileCardStories.CommentsWithAvatars.args,
  },
};

export const WithDescription: Story = {
  args: {
    ...CommentsWithAvatars.args,
    description: 'description',
  },
};

export const NoComments: Story = {
  args: {
    ...MyProfileCardStories.NoComments.args,
  },
};
