import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { PhotoSlider } from './slider';

const meta = {
  component: PhotoSlider,
  tags: ['autodocs'],
  title: 'UI/PhotoSlider',
} satisfies Meta<typeof PhotoSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

// const options: PhotoSliderOption[] = [
//   {
//     label: 'label_1',
//     value: 'value_1',
//   },
// ];

export const Simple: Story = {
  //   args: {
  //     inputValue: '',
  //     // options,
  //     value: '',
  //   },

  render: function Render() {
    // const [value, setValue] = useState<null | string>(null);
    // const [inputValue, setInputValue] = useState('');

    return <PhotoSlider />;
  },
};
