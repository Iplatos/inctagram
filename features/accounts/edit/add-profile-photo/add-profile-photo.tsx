import { useState } from 'react';

import { AvatarUploader } from '@/features/avatar-uploader';
import {
  useGetMeQuery,
  useLazyGetMyAvatarBase64Query,
  useSetMyAvatarMutation,
} from '@/shared/api/users-api';
import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Button } from '@/shared/ui';
import { CropProps } from '@/shared/ui/croppedImage';
import { nanoid } from '@reduxjs/toolkit';

import style from './add-profile-photo.module.scss';

export const AddProfilePhoto = () => {
  const { addProfilePhoto: t } = useTranslation().t.generalInformation;
  const [open, setOpen] = useState(false);

  const { data: meResponse } = useGetMeQuery();
  const [getAvatarBase64, { data: avatarBase64 }] = useLazyGetMyAvatarBase64Query();
  const [uploadAvatar] = useSetMyAvatarMutation();

  const handleAvatarUpload = (image: Blob, { offsetX, offsetY, scale }: CropProps) => {
    const formData = new FormData();

    formData.append('offsetX', offsetX.toString());
    formData.append('offsetY', offsetY.toString());
    formData.append('scale', scale.toString());
    formData.append('file', image, nanoid());

    uploadAvatar(formData);
  };

  // Manual destructuring to prevent unrecognized props from backend such as `updatedAt` from being passed to the internal `img` component.
  const dCP = getDefaultCropProps();
  const {
    offsetX = dCP.offsetX,
    offsetY = dCP.offsetY,
    scale = dCP.scale,
    url: src,
  } = meResponse?.data.avatar ?? {};

  return (
    <div className={style.photoContainer}>
      <Avatar
        classes={{ avatarRoot: style.avatar }}
        priority
        {...{ offsetX, offsetY, scale, src }}
      />
      <Button
        onClick={() => setOpen(true)}
        onMouseEnter={() => getAvatarBase64(undefined, true)}
        variant={'tertiary'}
      >
        {t.submitButton}
      </Button>

      <AvatarUploader
        avatar={avatarBase64 ?? undefined}
        initCropProps={{ offsetX, offsetY, scale }}
        onClose={() => setOpen(false)}
        onImageSave={handleAvatarUpload}
        open={open}
      />
    </div>
  );
};
