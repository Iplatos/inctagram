import { Meta, Story } from '@storybook/react';

import { TextField } from './TextField';

const meta = {
  argTypes: {
    inputtype: {
      options: ['text', 'password'],
    },
    isSearchInput: {
      options: [true, false],
    },
    value: {
      options: 'string',
    },
  },
  component: TextField,
  title: 'UI/TextField',
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFieldStandard: Story = {
  args: {
    inputtype: 'text',
    isSearchInput: false,
    value: '',
  },
};