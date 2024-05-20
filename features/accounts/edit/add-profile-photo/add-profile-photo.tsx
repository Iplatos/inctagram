import { useState } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { Modal } from '@/features';
import { AvatarUploader } from '@/features/avatar-uploader';
import {
  useDeleteMyAvatarMutation,
  useGetMeQuery,
  useLazyGetMyAvatarBase64Query,
  useSetMyAvatarMutation,
} from '@/shared/api/users-api';
import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Button, Typography } from '@/shared/ui';
import { CropProps } from '@/shared/ui/croppedImage';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

import s from './add-profile-photo.module.scss';

export const AddProfilePhoto = () => {
  const { addProfilePhoto: t } = useTranslation().t.generalInformation;

  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: meResponse, isFetching: isFetchingMyProfile } = useGetMeQuery();
  const [getAvatarBase64, { data: avatarBase64 }] = useLazyGetMyAvatarBase64Query();

  const [deleteAvatar, { isLoading: isDeletingAvatar }] = useDeleteMyAvatarMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useSetMyAvatarMutation();

  const handleAvatarUpload = (image: Blob, { offsetX, offsetY, scale }: CropProps) => {
    const formData = new FormData();

    formData.append('offsetX', offsetX.toString());
    formData.append('offsetY', offsetY.toString());
    formData.append('scale', scale.toString());
    formData.append('file', image, nanoid());

    uploadAvatar(formData);
  };

  const handleAvatarDelete = () => {
    deleteAvatar();
    setDeleteModalOpen(false);
  };

  // Manual destructuring to prevent unrecognized props from backend such as `updatedAt` from being passed to the internal `img` component.
  const dCP = getDefaultCropProps();
  const {
    offsetX = dCP.offsetX,
    offsetY = dCP.offsetY,
    scale = dCP.scale,
    url: src,
  } = meResponse?.data.avatar ?? {};

  const isUploaderDisabled = isUploadingAvatar || isDeletingAvatar || isFetchingMyProfile;
  const isImageUnavailable = isDeletingAvatar || isFetchingMyProfile;

  return (
    <div className={s.photoContainer}>
      <div className={s.avatarWrapper}>
        <Avatar
          classes={{
            avatarRoot: clsx(s.avatar),
            image: clsx(isImageUnavailable && s.avatarImage),
          }}
          priority
          {...{ offsetX, offsetY, scale, src }}
        />
        {src && (
          <button
            className={s.deleteButton}
            disabled={isUploaderDisabled}
            onClick={() => setDeleteModalOpen(true)}
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <Button
        disabled={isUploaderDisabled}
        onClick={() => setUploaderOpen(true)}
        onMouseEnter={() => getAvatarBase64(undefined, true)}
        variant={'tertiary'}
      >
        {t.submitButton}
      </Button>

      <AvatarUploader
        avatar={avatarBase64 ?? undefined}
        initCropProps={{ offsetX, offsetY, scale }}
        onClose={() => setUploaderOpen(false)}
        onImageSave={handleAvatarUpload}
        open={uploaderOpen}
      />

      <Modal
        onClose={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
        showCloseButton
        title={'Delete Photo'}
      >
        <Typography.Regular16>Are you sure you want to delete the photo?</Typography.Regular16>
        <div className={s.modalButtonsGroup}>
          <Button className={s.modalButton} onClick={handleAvatarDelete} variant={'tertiary'}>
            Yes
          </Button>
          <Button className={s.modalButton} onClick={() => setDeleteModalOpen(false)}>
            No
          </Button>
        </div>
      </Modal>
    </div>
  );
};
