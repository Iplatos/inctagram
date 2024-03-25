import { useEffect, useState } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import UserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarProps } from './avatar';

type AvatarPropsAndCustomArgs = AvatarProps & { delayMs?: number; imageType: 'dynamic' | 'static' };

const meta = {
  argTypes: {
    delayMs: {
      control: 'number',
      if: { arg: 'imageType', eq: 'dynamic' },
    },
    imageType: {
      control: 'inline-radio',
      defaultValue: 'static',
      options: ['static', 'dynamic'],
    },
  },
  component: Avatar,

  parameters: {
    controls: {
      include: ['imageType', 'delayMs', 'alt', 'size', 'fallbackDelayMs'],
    },
  },
  tags: ['autodocs'],
  title: 'UI/Avatar',
} satisfies Meta<AvatarPropsAndCustomArgs>;

export default meta;
type Story = StoryObj<AvatarPropsAndCustomArgs>;

const wait = (ms?: number) =>
  new Promise(res => {
    setTimeout(res, ms);
  });

const CustomRender = ({ delayMs, imageType, src, ...args }: AvatarPropsAndCustomArgs) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (imageType === 'static') {
      return;
    }

    wait(delayMs)
      .then(() => fetch('https://jsonplaceholder.typicode.com/albums/1/photos?id=1'))
      .then(response => response.json())
      .then(json => setUrl(json[0].url));
  }, [delayMs, imageType]);

  return <Avatar fill src={imageType === 'static' ? src : url} {...args} />;
};

export const StaticImage: Story = {
  args: {
    fallback: <AvatarFallback />,
    imageType: 'static',
    src: UserAvatar,
  },
  render: CustomRender,
};

export const Fallback: Story = {
  args: {
    ...StaticImage.args,
    src: 'does-not-exist',
  },
  render: CustomRender,
};

export const AsLink: Story = {
  args: StaticImage.args,
  render: args => (
    <a href={'/?path=/docs/ui-alert--docs'} title={'go to the Alert docs'}>
      <CustomRender {...args} />
    </a>
  ),
};

export const RemoteImage: Story = {
  args: { ...StaticImage.args, delayMs: 3000, imageType: 'dynamic' },
  render: CustomRender,
};
