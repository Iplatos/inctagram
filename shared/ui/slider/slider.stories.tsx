import { useState } from 'react';

import { Slider } from '@/shared/ui/slider/slider';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoThumbSlider: Story = {
  args: {
    thumbCount: 2,
    value: undefined,
  },
  render: function Render(args) {
    const [value, setValue] = useState<number[]>();

    function onChange(newValue: number[]) {
      setValue(newValue);
    }

    return <Slider onValueChange={onChange} thumbCount={2} value={value} />;
  },
};

export const OneThumbSlider: Story = {
  args: {
    thumbCount: 1,
    value: undefined,
  },
  render: function Render(args) {
    const [value, setValue] = useState<number[]>();

    function onChange(newValue: number[]) {
      setValue(newValue);
    }

    return <Slider onValueChange={onChange} thumbCount={1} value={value} />;
  },
};
