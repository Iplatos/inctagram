import { useState } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { AvatarUploader, AvatarUploaderProps } from '@/features/avatar-uploader';
import { ConfirmModal } from '@/features/confirm-modal';
import {
  useDeleteMyAvatarMutation,
  useGetMeQuery,
  useLazyGetMyAvatarBase64Query,
  useSetMyAvatarMutation,
} from '@/shared/api/users-api';
import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Avatar, Button, Typography } from '@/shared/ui';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

import s from './add-profile-photo.module.scss';

export const AddProfilePhoto = () => {
  const { t } = useTranslation();

  const { addPhotoButton: tButton, deleteAvatarModal: tModal } = useTranslation().t.editProfile;

  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: meResponse, isFetching: isFetchingMyProfile } = useGetMeQuery();
  const [getAvatarBase64, { data: avatarBase64 }] = useLazyGetMyAvatarBase64Query();

  const [deleteAvatar, { isLoading: isDeletingAvatar }] = useDeleteMyAvatarMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useSetMyAvatarMutation();

  const handleAvatarUpload: AvatarUploaderProps['onImageSave'] = (
    image,
    { mediaType, offsetX, offsetY, scale }
  ) => {
    const formData = new FormData();
    const [, subtype = ''] = mediaType.split('/');
    const isValidAvatar = ['jpeg', 'png'].includes(subtype);

    if (!isValidAvatar) {
      console.warn(
        `Can't specify the MIME type of the loaded file from user device. Loaded image must be of either JPEG of PNG type. When sent to the server, the user's avatar will not be provided with metadata about the image type. Received MIME type: ${mediaType}.`
      );
    }

    formData.append('offsetX', offsetX.toString());
    formData.append('offsetY', offsetY.toString());
    formData.append('scale', scale.toString());
    formData.append('file', image, nanoid() + (isValidAvatar ? `.${subtype}` : ''));

    uploadAvatar(formData);
  };

  const handleAvatarDelete = () => {
    deleteAvatar();
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
  const onCloseModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className={s.photoContainer}>
      <div className={s.avatarWrapper}>
        <Avatar
          classes={{
            avatarRoot: clsx(s.avatar),
            image: clsx(isUploaderDisabled && s.avatarImage),
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
        {tButton}
      </Button>

      <AvatarUploader
        avatar={avatarBase64 ?? undefined}
        initCropProps={{ offsetX, offsetY, scale }}
        onClose={() => setUploaderOpen(false)}
        onImageSave={handleAvatarUpload}
        open={uploaderOpen}
      />

      <ConfirmModal
        cancelButtonTitle={t.editProfile.deleteAvatarModal.buttons.deny}
        confirmButtonTitle={t.editProfile.deleteAvatarModal.buttons.confirm}
        headerTitle={tModal.title}
        onCancel={onCloseModal}
        onConfirm={handleAvatarDelete}
        onOpenChange={onCloseModal}
        open={deleteModalOpen}
      >
        <Typography.Regular16>{tModal.message}</Typography.Regular16>
      </ConfirmModal>
    </div>
  );
};
