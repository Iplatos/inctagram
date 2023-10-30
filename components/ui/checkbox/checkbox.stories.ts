import { Checkbox } from "./";
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
          },
          label: {
            control: 'string',
          },
          disabled: {
            control: 'boolean',
          },
    },
  } satisfies Meta<typeof Checkbox>
   

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
    args: {
      checked: false,
    },
}

export const UncheckedWithLabel: Story = {
    args: {
      checked: false,
      label: "Checkbox label"
    },
}

export const Checked: Story = {
    args: {
      checked: true,
    },
}
export const CheckedWithLabel: Story = {
    args: {
      checked: true,
      label: "Checkbox label"
    },
}

export const CheckedDisabled: Story = {
    args: {
      checked: true,
      disabled: true
    },
}
export const CheckedDisabledWithLabel: Story = {
    args: {
      checked: true,
      disabled: true,
      label: "Checkbox label"
    },
}

export const UncheckedDisabled: Story = {
    args: {
      checked: false,
      disabled: true
    },
}

export const UncheckedDisabledWithLabel: Story = {
    args: {
      checked: false,
      disabled: true,
      label: "Checkbox label"
    },
}