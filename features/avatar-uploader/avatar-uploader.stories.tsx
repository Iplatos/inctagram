import { FC, useEffect, useState } from 'react';

import MockUserAvatar from '@/assets/img/mock-user-avatar.jpg';
import { blobToBase64 } from '@/shared/helpers';
import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { Avatar, Button } from '@/shared/ui';
import { CropProps } from '@/shared/ui/croppedImage';
import { Meta, StoryObj } from '@storybook/react';

import { AvatarUploader, AvatarUploaderProps } from './avatar-uploader';

type CustomRenderProps = {
  specifiedImage: 'base64' | 'file' | 'none';
};

const CustomRender: FC<CustomRenderProps> = ({ specifiedImage }) => {
  const [open, setOpen] = useState(false);

  const [avatar, setAvatar] = useState<File | string | undefined>(undefined);
  const [avatarBase64, setAvatarBase64] = useState<string | undefined>(undefined);
  const [cropProps, setCropProps] = useState<CropProps>(getDefaultCropProps());

  useEffect(() => {
    if (specifiedImage === 'none') {
      return;
    }
    const fetchImage = async () => {
      const res = await fetch(MockUserAvatar.src);
      const imageFile = new File([await res.blob()], 'user-avatar', { type: 'image/png' });
      const base64 = await blobToBase64(imageFile);

      if (specifiedImage === 'file') {
        setAvatar(imageFile);
      } else {
        setAvatar(base64);
      }
      setAvatarBase64(base64);
    };

    fetchImage();
  }, [specifiedImage]);

  const resetAvatar = () => {
    setAvatar(undefined);
    setAvatarBase64(undefined);
    setCropProps(getDefaultCropProps());
  };

  const handleImageSave: AvatarUploaderProps['onImageSave'] = async (image, cropProps) => {
    const base64 = await blobToBase64(image);

    setAvatar(base64);
    setAvatarBase64(base64);
    setCropProps(cropProps);
  };

  return (
    <>
      <div className={'container'}>
        <Avatar classes={{ avatarRoot: 'avatar' }} src={avatarBase64} {...cropProps} />
        <Button className={'button'} onClick={() => setOpen(true)}>
          add
        </Button>
        <Button className={'button'} onClick={resetAvatar}>
          Reset
        </Button>
      </div>
      <AvatarUploader
        avatar={avatar}
        initCropProps={cropProps}
        onClose={() => setOpen(false)}
        onImageSave={handleImageSave}
        open={open}
      />
    </>
  );
};

const meta = {
  argTypes: {
    specifiedImage: {
      control: 'radio',
      options: ['base64', 'file', 'none'] as CustomRenderProps['specifiedImage'][],
    },
  },
  component: CustomRender,
  decorators: [
    Story => (
      <>
        <style>
          {`
          .container { display: flex; flex-direction: column; align-items: center; gap: 1rem; width: fit-content; }
          .avatar { width: 10rem; height: 10rem; }
          .button { width: 7rem; }
          `}
        </style>
        <Story />
      </>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/AvatarUploader',
} satisfies Meta<CustomRenderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { specifiedImage: 'none' },
};
export const AvatarAsBase64: Story = {
  args: { specifiedImage: 'base64' },
};
export const AvatarAsFile: Story = {
  args: { specifiedImage: 'file' },
};
