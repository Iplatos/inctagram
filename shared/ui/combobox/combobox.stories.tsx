import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { ComboboxOption } from '@/shared/ui/combobox/combobox';

import { Combobox } from '.';

const meta = {
  component: Combobox,
  tags: ['autodocs'],
  title: 'UI/Combobox',
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: ComboboxOption[] = [
  {
    label: 'label_1',
    value: 'value_1',
  },
  {
    label: 'label_2',
    value: 'value_2',
  },
  {
    label: 'label_3',
    value: 'value_3',
  },
  {
    label: 'label_4',
    value: 'value_4',
  },
  {
    label: 'label_5',
    value: 'value_5',
  },
];

export const Simple: Story = {
  args: {
    inputValue: '',
    options,
    value: '',
  },

  render: function Render(args) {
    const [value, setValue] = useState<null | string>(null);
    const [inputValue, setInputValue] = useState('');

    return (
      <Combobox
        {...args}
        inputValue={inputValue}
        onChange={setValue}
        onInputChange={setInputValue}
        placeholder={'Country'}
        value={value ?? ''}
      />
    );
  },
};
