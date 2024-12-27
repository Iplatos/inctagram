import { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  argTypes: {
    borderRadius: { control: 'text', description: 'Border radius of the skeleton.' },
    height: { control: 'text', description: 'Height of the skeleton.' },
    variant: {
      control: 'select',
      description: 'The variant of the skeleton, either circular or square.',
      options: ['circle', 'square'],
    },
    width: { control: 'text', description: 'Width of the skeleton.' },
  },
  component: Skeleton,
  title: 'UI/Skeleton',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSkeleton: Story = {
  args: {
    height: '100px',
    variant: 'square',
    width: '100px',
  },
};

export const CircleSkeleton: Story = {
  args: {
    height: '100px',
    variant: 'circle',
    width: '100px',
  },
};

export const CustomBorderRadiusSkeleton: Story = {
  args: {
    borderRadius: '8px',
    height: '20px',
    width: '100px',
  },
};
