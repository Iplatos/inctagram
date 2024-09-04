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
  const {
    t: {
      common: tCommon,
      editProfile: { addPhotoButton: tButton, deleteAvatarModal: tModal },
    },
  } = useTranslation();

  const [uploaderOpen, setUploaderOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data: meResponse, isFetching: isFetchingMyProfile } = useGetMeQuery();
  const [getAvatarBase64, { data: avatarBase64 }] = useLazyGetMyAvatarBase64Query();

  const [deleteAvatar, { isLoading: isDeletingAvatar }] = useDeleteMyAvatarMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useSetMyAvatarMutation();

  const handleAvatarUpload: AvatarUploaderProps['onImageSave'] = async (
    image,
    { mediaType, offsetX, offsetY, scale }
  ) => {
    const formData = new FormData();
    const [, subtype = ''] = mediaType.split('/');
    const isValidAvatar = ['jpeg', 'png'].includes(subtype);

    if (!isValidAvatar) {
      console.warn(
        `Can't specify the MIME type of the loaded file from user device. Loaded image must be of either JPEG or PNG type. When sent to the server, the user's avatar will not be provided with metadata about the image type. Received MIME type: ${mediaType}.`
      );
    }

    formData.append('offsetX', offsetX.toString());
    formData.append('offsetY', offsetY.toString());
    formData.append('scale', scale.toString());
    formData.append('file', image, nanoid() + (isValidAvatar ? `.${subtype}` : ''));

    try {
      await uploadAvatar(formData).unwrap();
      setUploaderOpen(false);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      await deleteAvatar().unwrap();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete avatar:', error);
    }
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

  const handleUploaderModalClose = () => {
    const shouldCloseAndResetModal = !isUploaderDisabled;

    if (shouldCloseAndResetModal) {
      setUploaderOpen(false);
    }

    // Returns `true` when the uploader unlocks, to explicitly tell it to clear its state when it closes.
    return shouldCloseAndResetModal;
  };

  const handleDeleteModalClose = () => {
    if (!isDeletingAvatar) {
      setDeleteModalOpen(false);
    }
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
        disabled={isUploaderDisabled}
        initCropProps={{ offsetX, offsetY, scale }}
        onClose={handleUploaderModalClose}
        onImageSave={handleAvatarUpload}
        open={uploaderOpen}
      />

      <ConfirmModal
        cancelButtonTitle={tCommon.modal.buttonNames.cancel}
        confirmButtonTitle={tCommon.modal.buttonNames.confirm}
        disabled={isUploaderDisabled}
        headerTitle={tModal.title}
        onCancel={handleDeleteModalClose}
        onConfirm={handleAvatarDelete}
        open={deleteModalOpen}
      >
        <Typography.Regular16>{tModal.message}</Typography.Regular16>
      </ConfirmModal>
    </div>
  );
};
