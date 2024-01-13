import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { useArgs } from '@storybook/preview-api';

import { Combobox } from '.';

const meta = {
  component: Combobox,
  tags: ['autodocs'],
  title: 'Components/Combobox',
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
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

// export const Default: Story = {
//   args: {
//     options,
//     disabled: false,
//   },

//   render: args => {
//     const [value, setValue] = useState(null);
//     const [inputValue, setInputValue] = useState('');

//     return (
//       <div>
//         <div style={{ width: 200 }}>
//           <Combobox
//             {...args}
//             value={value}
//             onChange={setValue}
//             inputValue={inputValue}
//             onInputChange={setInputValue}
//             placeholder={'Country'}
//           />
//         </div>
//         <div>Selected value: {value}</div>
//       </div>
//     );
//   },
// };

export const Simple: Story = {
  args: {
    options,
  },

  render: function Render(args) {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    return (
      <Combobox
        {...args}
        inputValue={inputValue}
        value={value}
        onChange={setValue}
        onInputChange={setInputValue}
        placeholder={'Country'}
      />
    );
  },
};
