import type { Meta, StoryObj } from '@storybook/react';

import { OptionRadioGroup, RadioGroup } from '@/shared/ui';

const mockedOptions: OptionRadioGroup[] = [
  {
    label: 'First',
    value: '1',
  },
  {
    label: 'Second',
    value: '2',
  },
  {
    label: 'Third',
    value: '3',
  },
];

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    options: {
      defaultValue: mockedOptions,
    },
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/RadioGroup',
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: mockedOptions,
  },
};

export const DisabledItem: Story = {
  args: {
    options: [
      ...mockedOptions,
      {
        disabled: true,
        label: 'Disabled Item',
        value: 'none',
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: mockedOptions,
  },
};
