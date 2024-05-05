import { Meta, StoryObj } from '@storybook/react';

import FlagRu from '../../../assets/icons/flag-ru.svg';
import FlagEn from '../../../assets/icons/flag-uk.svg';
import { SelectBox } from './select-box';

const mockedPlaceHolder = 'A placeholder';
const mockedOptions = [
  { image: FlagEn, label: 'text111', value: '1111' },
  { image: FlagRu, label: 'text222', value: '2222' },
  { label: 'text333', value: '3333' },
];

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    options: {
      defaultValue: mockedOptions,
    },
    placeholder: {
      control: 'string',
      defaultValue: mockedPlaceHolder,
    },
  },
  component: SelectBox,
  tags: ['autodocs'],
  title: 'Components/select-box',
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultWithNoProps: Story = {
  args: {},
};

export const DefaultWithPlaceholder: Story = {
  args: { placeholder: mockedPlaceHolder },
};

export const DefaultPlaceholderAndOptions: Story = {
  args: {
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const DisabledPlaceholderAndOptions: Story = {
  args: {
    disabled: true,
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const SmallPlaceholderAndOptions: Story = {
  args: {
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const SmallWithDefaultStringValue: Story = {
  args: {
    defaultValue: 'a value',
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const SmallWithDefaultOptionValue: Story = {
  args: {
    defaultValue: 1,
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const SmallWithDefaultNumberValue: Story = {
  args: {
    defaultValue: 123,
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const SmallDisabledWithPlaceHolder: Story = {
  args: {
    disabled: true,
    options: mockedOptions,
    placeholder: mockedPlaceHolder,
  },
};

export const TinyPlaceholderAndImages: Story = {
  args: {
    options: [
      { image: FlagEn, value: '1111' },
      { image: FlagRu, value: '2222' },
    ],
  },
};

export const TinyWithDefaultStringDisabled: Story = {
  args: {
    defaultValue: 'sad :(',
    disabled: true,
  },
};
