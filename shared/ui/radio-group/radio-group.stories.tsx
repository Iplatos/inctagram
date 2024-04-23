import type { Meta, StoryObj } from '@storybook/react';

import { OptionsRadioGroup, RadioGroup } from '@/shared/ui';

const mockedOptions: OptionsRadioGroup = [
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
  title: 'Components/RadioGroup',
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
