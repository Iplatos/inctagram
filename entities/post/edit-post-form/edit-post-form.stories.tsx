import { Button } from '@/shared/ui';
import { Meta, StoryObj } from '@storybook/react';

import { EditPostForm } from './edit-post-form';

/** Form for edit post description */
const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'disabled submit button when loading',
    },
    onSubmit: {
      control: 'action',
      description: 'function for edit post on the server',
    },
  },
  component: EditPostForm,
  decorators: [
    (Story, { args }) => (
      <div style={{ width: `min(100%, 400px)` }}>
        <Button form={args.id} style={{ margin: '1rem' }} type={'submit'}>
          Submit
        </Button>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'ENTITIES/post/EditPostForm',
} satisfies Meta<typeof EditPostForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'edit-post-form',
    textLimit: 50,
  },
};
