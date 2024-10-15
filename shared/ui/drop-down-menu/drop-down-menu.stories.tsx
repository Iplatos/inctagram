import type { Meta, StoryObj } from '@storybook/react';

import { CloseIcon } from '@/assets/icons/close';
import { Button, IconButton } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu/index';

const meta = {
  argTypes: {
    align: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger.',
      options: ['start', 'center', 'end'],
    },
    children: {
      control: false,
      description: 'Content for drop-down',
    },
    side: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
    },
    trigger: {
      control: false,
      description: 'A component for controlling the display of the dropdown menu',
    },
  },
  component: DropDown.Menu,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/DropDownMenu',
} satisfies Meta<typeof DropDown.Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <DropDown.Item startIcon={<CloseIcon />}>Check all</DropDown.Item>
        <DropDown.Item endIcon={<CloseIcon />}>View all</DropDown.Item>
        <DropDown.Item>
          <Button>Logout</Button>
        </DropDown.Item>
      </>
    ),
    sideOffset: 10,
    trigger: <IconButton>I AM A TRIGGER</IconButton>,
  },
};

export const WithSeparator: Story = {
  args: {
    children: (
      <div>
        <DropDown.Item startIcon={<CloseIcon />}>Check all</DropDown.Item>
        <DropDown.Separator />
        <DropDown.Item endIcon={<CloseIcon />}>View all</DropDown.Item>
        <DropDown.Separator />
        <DropDown.Item>
          <Button>Logout</Button>
        </DropDown.Item>
      </div>
    ),
    sideOffset: 10,
    trigger: <IconButton>I AM A TRIGGER</IconButton>,
  },
};
