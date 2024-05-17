import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { HeartFilled } from '@/assets/icons/heart-filled';
import { HeartOutlined } from '@/assets/icons/heart-outlined';
import { IconButton } from '@/shared/ui/IconButton/IconButton';

import s from './iconButton.module.scss';

const meta = {
  argTypes: {},
  component: IconButton,
  tags: ['autodocs'],
  title: 'Components/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallIconButton: Story = {
  args: {
    activeIcon: <HeartFilled className={s.filled} />,
    disabled: false,
    icon: <HeartOutlined className={s.smth} />,
    size: 'small',
  },
  render: function Render(args) {
    const [active, setActive] = useState<boolean>(false);

    return (
      <IconButton {...args} isActive={active} onChange={() => setActive(!active)} size={'small'} />
    );
  },
};

export const MediumIconButton: Story = {
  args: {
    activeIcon: <HeartFilled className={s.filled} />,
    disabled: false,
    icon: <HeartOutlined className={s.smth} />,
    size: 'medium',
  },
  render: function Render(args) {
    const [active, setActive] = useState<boolean>(false);

    return (
      <IconButton {...args} isActive={active} onChange={() => setActive(!active)} size={'medium'} />
    );
  },
};

export const LargeIconButton: Story = {
  args: {
    activeIcon: <HeartFilled className={s.filled} />,
    disabled: false,
    icon: <HeartOutlined className={s.smth} />,
    size: 'medium',
  },
  render: function Render(args) {
    const [active, setActive] = useState<boolean>(false);

    return (
      <IconButton {...args} isActive={active} onChange={() => setActive(!active)} size={'large'} />
    );
  },
};

export const IconButtonWithoutState: Story = {
  args: {
    disabled: false,
    icon: <CloseIcon />,
    size: 'small',
  },
};
