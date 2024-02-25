import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { TextField, TextFieldProps } from './TextField';

type TextFieldAsInputProps = Extract<TextFieldProps, { as?: 'input' }>;
type TextFieldAsTextAreaProps = Extract<TextFieldProps, { as: 'textarea' }>;

const CustomRender = (props: TextFieldAsInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    props.onChange(value);
    setValue(value);
  };

  return <TextField {...props} onChange={handleChange} value={value} />;
};

const meta = {
  argTypes: {
    as: { options: ['input', 'textarea'] },
    inputType: {
      if: { arg: 'as', neq: 'textarea' },
      options: ['text', 'password', 'search'],
    },
  },
  component: TextField,
  decorators: [
    Story => (
      <div style={{ maxWidth: 450 }}>
        <Story />
      </div>
    ),
  ],
  render: CustomRender,
  title: 'UI/TextField',
} satisfies Meta<TextFieldAsInputProps>;

export default meta;
type Story = StoryObj<TextFieldAsInputProps>;

export const Primary: Story = {
  args: {
    disabled: false,
    label: 'label',
    placeholder: 'placeholder',
    required: false,
  },
};

export const Password: Story = {
  args: {
    ...Primary.args,
    inputType: 'password',
  },
};

export const Search: Story = {
  args: {
    ...Primary.args,
    inputType: 'search',
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    error: 'some threatening error',
  },
};

export const TextArea: StoryObj<TextFieldAsTextAreaProps> = {
  args: {
    ...Primary.args,
    as: 'textarea',
  },
};
