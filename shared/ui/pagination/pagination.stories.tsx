import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'UI/Pagination',
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <Pagination />;
  },
};
