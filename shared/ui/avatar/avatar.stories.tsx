import { useEffect, useState } from 'react';

import UserPhotoFallbackIcon from '@/assets/icons/account-photo.svg?url';
import UserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

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
    wait(delayMs)
      .then(() => fetch('https://jsonplaceholder.typicode.com/albums/1/photos?id=1'))
      .then(response => response.json())
      .then(json => setUrl(json[0].url));
  }, [delayMs]);

  return <Avatar fill src={imageType === 'static' ? src : url} {...args} />;
};

export const StaticImage: Story = {
  args: {
    fallback: (
      <Image
        alt={'avatar fallback'}
        src={UserPhotoFallbackIcon}
        style={{ height: '50%', width: '50%' }}
      />
    ),
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
