import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { ScrollAreaContainer } from './index';

const meta = {
  argTypes: {
    orientation: {
      control: { options: ['both', 'horizontal', 'vertical'], type: 'select' },
    },
    scrollbarSize: {
      control: { type: 'number' },
    },
    style: {
      control: 'text',
    },
    thumbStyle: {
      control: 'text',
    },
    type: {
      control: { options: ['always', 'auto', 'hover', 'scroll'], type: 'select' },
    },
  },
  component: ScrollAreaContainer,
  title: 'UI/ScrollAreaContainer',
} satisfies Meta<typeof ScrollAreaContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = {
  height: '225px',
  width: '200px',
};

export const Vertical: Story = {
  args: {
    children: (
      <div style={{ height: '600px' }}>
        <div>This is a vertically scrollable area.</div>
        <div>Scroll down to see more content.</div>
        <div style={{ height: '1200px' }}>...</div>
        <div>End of content.</div>
      </div>
    ),
    orientation: 'vertical',
    scrollbarSize: 10,
    type: 'auto',
  },
  render: args => {
    return (
      <div style={styles}>
        <ScrollAreaContainer {...args} />
      </div>
    );
  },
};

export const Horizontal: Story = {
  args: {
    children: (
      <div style={{ width: '600px' }}>
        <p>This is a horizontally scrollable area.</p>
        <p>Scroll right to see more content.</p>
        <p style={{ width: '1200px' }}>...</p>
        <p>End of content.</p>
      </div>
    ),
    orientation: 'horizontal',
    scrollbarSize: 10,
    type: 'auto',
  },
  render: args => (
    <div style={styles}>
      <ScrollAreaContainer {...args} />
    </div>
  ),
};

export const Both: Story = {
  args: {
    children: (
      <div style={{ height: '600px', width: '600px' }}>
        <p>This is a scrollable area in both directions.</p>
        <p>Scroll to see more content.</p>
        <p style={{ height: '1200px', width: '1200px' }}>...</p>
        <p>End of content.</p>
      </div>
    ),
    orientation: 'both',
    scrollbarSize: 10,
    type: 'auto',
  },
  render: args => (
    <div style={styles}>
      <ScrollAreaContainer {...args} />
    </div>
  ),
};

export const CustomScrollbars: Story = {
  args: {
    children: (
      <div style={{ height: '600px', width: '600px' }}>
        <p>This area has custom scrollbar styles.</p>
        <p>Scroll to see more content.</p>
        <p>End of content.</p>
      </div>
    ),
    orientation: 'both',
    scrollbarSize: 15,
    type: 'auto',
  },
  render: args => (
    <div style={styles}>
      <ScrollAreaContainer {...args} />
    </div>
  ),
};
