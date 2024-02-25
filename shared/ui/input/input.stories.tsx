import { CalendarFilled } from '@/assets/icons/calendar-filled';
import { CalendarOutlined } from '@/assets/icons/calendar-outlined';
import { CloseIcon } from '@/assets/icons/close';
import { InputAdornment } from '@/shared/ui/input-adornment';
import { Meta, StoryObj } from '@storybook/react';

import { Input, InputClasses } from './input';

const inputClasses = JSON.stringify(
  { input: 'string', inputRoot: 'string' } as InputClasses,
  null,
  2
);

const inputAdornmentArgType = {
  description: `Can be used to extend the input functionality or its design/layout.
    This can be any arbitrary react element, but it is recommended to wrap such an element
    in an \`InputAdornment\` element that provides styles to align and limit the size
    of its contents.`,
  table: { type: { summary: 'ReactNode' } },
};

/**
 * Common Input element based on react native input element.
 * It can be used in both uncontrolled and controlled way.
 * */
const meta = {
  argTypes: {
    classes: {
      description: `An object containing the names of the classes corresponding to the
        component slots. Provided classnames will be merged with default slots classnames.`,
      table: {
        type: {
          detail: inputClasses,
          summary: 'InputClasses',
        },
      },
    },

    disabled: { table: { type: { summary: 'boolean' } } },

    endAdornment: inputAdornmentArgType,

    error: { table: { type: { summary: 'boolean' } } },

    onValueChange: {
      description: `Event handler called when the value changes.`,
      table: { type: { summary: '(value: string) => void' } },
    },

    placeholder: { table: { type: { summary: 'string' } } },

    startAdornment: inputAdornmentArgType,

    type: {
      description: 'The type is assigned to a native react element',
    },
  },

  component: Input,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35ch' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Input',
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const getAdornments = (position: 'end' | 'start' = 'start') => ({
  'calendar filled': (
    <InputAdornment position={position}>
      <CalendarFilled />
    </InputAdornment>
  ),
  'calendar outlined': (
    <InputAdornment position={position}>
      <CalendarOutlined />
    </InputAdornment>
  ),
  'close icon': (
    <InputAdornment position={position}>
      <CloseIcon />
    </InputAdornment>
  ),
});

const options = Object.keys(getAdornments());

export const Primary: Story = {
  argTypes: {
    endAdornment: {
      mapping: getAdornments('end'),
      options,
    },
    startAdornment: {
      mapping: getAdornments('start'),
      options,
    },
  },
  args: { disabled: false, error: false, placeholder: 'placeholder' },
};

export const Error: Story = {
  argTypes: Primary.argTypes,
  args: {
    ...Primary.args,
    error: true,
  },
};

export const StartAdornment: Story = {
  argTypes: Primary.argTypes,
  args: { ...Primary.args, startAdornment: 'calendar outlined' },
};

export const EndAdornment: Story = {
  argTypes: Primary.argTypes,
  args: { ...Primary.args, endAdornment: 'close icon' },
};

export const BothAdornments: Story = {
  argTypes: Primary.argTypes,
  args: {
    ...StartAdornment.args,
    ...EndAdornment.args,
  },
};
