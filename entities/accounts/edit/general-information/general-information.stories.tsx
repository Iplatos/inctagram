import type { Meta, StoryObj } from '@storybook/react';

import { GeneralInformation } from './general-information';

const meta = {
  argTypes: {},
  component: GeneralInformation,
  tags: ['autodocs'],
  title: 'Accounts/Edit/GeneralInformation',
} satisfies Meta<typeof GeneralInformation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
