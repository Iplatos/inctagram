import type { Meta, StoryObj } from '@storybook/react';

import { useArgs } from '@storybook/preview-api';

import { Checkbox } from '.';

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
  title: 'UI/Checkbox',
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'hello world',
  },

  // render: args => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [checked, setChecked] = useState(false);

  //   return <Checkbox {...args} checked={checked} onChange={() => setChecked(!checked)} />;
  // },

  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ checked: !checked });
    }

    return <Checkbox {...args} checked={checked} onChange={onChange} />;
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
