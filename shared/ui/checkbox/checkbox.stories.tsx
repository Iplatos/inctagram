import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Checkbox } from '../checkbox/checkbox';

const meta = {
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'string',
    },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'hello world',
  },

  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(true);

    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export const UncheckedWithLabel: Story = {
  args: {
    checked: false,
    label: 'Unchecked with label',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};
export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Checked with label',
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
export const CheckedDisabledWithLabel: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Checked disabled with label',
  },
};

export const UncheckedDisabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const UncheckedDisabledWithLabel: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Unchecked and disabled with label',
  },
};
