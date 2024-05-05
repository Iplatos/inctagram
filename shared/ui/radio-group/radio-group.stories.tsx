import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupOption } from './radio-group';

const mockedOptions: RadioGroupOption[] = [
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

/**
 * Common component based on the headless [Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group#indicator) component from the Radix-UI.
 */
const meta = {
  argTypes: {
    asChild: { table: { disable: true } },
    defaultValue: {
      control: 'text',
      description:
        'The value passed to the radio group when mounted. It is set to the first `options` element, if provided. Otherwise it is `undefined`.',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    onValueChange: {
      control: { action: 'onValueChange' },
      description: 'Event handler called when the value changes.',
      table: { type: { summary: '(value: string) => void' } },
    },
    options: {
      table: {
        type: {
          detail: `Array<${JSON.stringify(
            { 'disabled?': 'boolean', 'label?': 'string', value: 'string' },
            null,
            2
          )}>`,
          summary: 'RadioGroupOption[]',
        },
      },
    },
    orientation: {
      control: 'inline-radio',
      description: 'The orientation of the component.',
      options: ['horizontal', 'vertical'],
      table: { type: { summary: 'horizontal | vertical' } },
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
    defaultValue: mockedOptions[0].value,
    disabled: false,
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
