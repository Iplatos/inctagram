import { FC, useState } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { convertFileToBase64 } from '@/shared/helpers/convertFileToBase64';
import { Avatar, Button } from '@/shared/ui';
import { CropProps } from '@/shared/ui/croppedImage';
import { Meta, StoryObj } from '@storybook/react';

import { AvatarUploader, AvatarUploaderProps } from './avatar-uploader';

const defaultCropProps = { offsetX: 0.5, offsetY: 0.5, scale: 1 };

const CustomRender: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [cropProps, setCropProps] = useState<CropProps>(defaultCropProps);

  const resetAvatar = () => {
    setAvatar(undefined);
    setCropProps(defaultCropProps);
  };

  const handleImageSave: AvatarUploaderProps['onImageSave'] = async (image, cropProps) => {
    if (typeof image === 'string') {
      setAvatar(image);
      setCropProps(cropProps);
    } else {
      const avatar = await convertFileToBase64(image);

      setAvatar(avatar);
      setCropProps(cropProps);
    }
  };

  return (
    <>
      <style>
        {`
        .container { display: flex; flex-direction: column; align-items: center; gap: 1rem; width: fit-content; }
        .avatar { width: 10rem; height: 10rem; }
        .button { width: 7rem; }
        `}
      </style>
      <div className={'container'}>
        <Avatar classes={{ avatarRoot: 'avatar' }} src={avatar} {...cropProps} />
        <Button className={'button'} onClick={() => setOpen(true)}>
          add
        </Button>
        <Button className={'button'} onClick={() => resetAvatar()}>
          Reset
        </Button>
      </div>
      <AvatarUploader
        avatar={avatar}
        cropProps={cropProps}
        onClose={() => setOpen(false)}
        onImageSave={handleImageSave}
        open={open}
      />
    </>
  );
};

const meta = {
  component: CustomRender,
  tags: ['autodocs'],
  title: 'UI/AvatarUploader',
} satisfies Meta<{}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
