import React, { ChangeEvent, FC, useRef } from 'react';
import AvatarEditor, { CroppedRect, Position } from 'react-avatar-editor';

import { PreviewAvatarCard } from '@/features/avatar-uploader/preview-avatar-card';
import { dataURLToBlob } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Modal } from '@/shared/ui';
import { CropProps } from '@/shared/ui/croppedImage';
import { AddPhotoCard, AddPhotoCardProps } from '@/widgets/addPhotoCard';

import s from './avatar-uploader.module.scss';

import { useAvatarUploader } from './use-avatar-uploader';

// TODO: add missing common components to index file in shared/ui
export type AvatarUploaderProps = {
  avatar?: File | string;
  disabled?: boolean;
  initCropProps?: CropProps;
  /**
   * `onClose` callback should return `true` if you want the loader to reset its state when closed.
   * In particular, this means resetting the preview loaded from the device along with the error message.
   * */
  onClose: () => boolean | void;
  onImageSave: (image: Blob, cropProps: CropProps & { mediaType: string }) => Promise<void> | void;
  open: boolean;
};

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatar,
  disabled,
  initCropProps,
  onClose,
  onImageSave,
  open,
}) => {
  const { avatarUploader: t } = useTranslation().t.common;
  const editorRef = useRef<AvatarEditor>(null);
  const {
    actions: {
      editorPositionChanged,
      editorPositionInitialized,
      editorReset,
      loadedFromDevice,
      scaleChanged,
    },
    dispatch,
    state,
  } = useAvatarUploader(initCropProps?.scale);

  const changeImageScale = (e: React.WheelEvent<HTMLDivElement>) => {
    const offset = e.deltaY > 0 ? -0.1 : 0.1;

    dispatch(scaleChanged(offset));
  };

  const handlePositionChange = (pos: Position) => {
    if (!disabled) {
      dispatch(editorPositionChanged(pos));
    }
  };

  const handleClose = () => {
    const shouldResetState = onClose();

    if (shouldResetState === true) {
      dispatch(editorReset());
    }
  };

  const uploadFromDevice = (e: ChangeEvent<HTMLInputElement>) => {
    const preview = e.target.files?.[0];

    if (!preview) {
      return;
    }

    dispatch(loadedFromDevice(preview));
  };

  const initEditorPosition = () => {
    if (editorRef.current) {
      const initPosition: CroppedRect & Partial<CropProps> = {
        ...editorRef.current.getCroppingRect(),
        ...initCropProps,
      };

      dispatch(editorPositionInitialized(initPosition));
    }
  };

  const saveAvatar = async () => {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const { height, width, x, y } = editor.getCroppingRect();
    const cropProps: CropProps = {
      offsetX: editorPositionToOffset(width, x),
      offsetY: editorPositionToOffset(height, y),
      scale: state.scale,
    };

    let maybePromise: Promise<void> | null | void = null;

    if (state.preview) {
      maybePromise = onImageSave(state.preview, {
        ...cropProps,
        mediaType: state.preview.type,
      });
    } else if (avatar) {
      const file = typeof avatar === 'string' ? dataURLToBlob(avatar) : avatar;

      maybePromise = onImageSave(file, { ...cropProps, mediaType: file.type });
    }

    if (maybePromise instanceof Promise) {
      await maybePromise;
    }

    dispatch(editorReset());
  };

  const resetAndCloseEditor = (open: boolean): void => {
    if (!open) {
      handleClose();
    }
  };

  const previewOrAvatar = state.preview ?? avatar;

  const sharedProps = {
    disabled,
    error: state.error,
    onFileInputChange: uploadFromDevice,
    title: t.title,
  } satisfies AddPhotoCardProps;

  return (
    <Modal classes={{ content: s.modalContent }} onOpenChange={resetAndCloseEditor} open={open}>
      {/* TODO: Add a slider so that users on touch devices can adjust the avatar's scale and prevent the card from scrolling on the `wheel` event (perhaps a better option would be to use useEffect) */}
      {previewOrAvatar ? (
        <PreviewAvatarCard
          avatarEditorProps={{
            onImageReady: initEditorPosition,
            onPositionChange: handlePositionChange,
            position: state.editorPosition,
            scale: state.scale,
          }}
          editorRef={editorRef}
          image={previewOrAvatar}
          onChangeAvatarScale={changeImageScale}
          onSaveAvatar={saveAvatar}
          primaryButtonTitle={t.buttons.save}
          secondaryButtonTitle={t.buttons.select}
          {...sharedProps}
        />
      ) : (
        <AddPhotoCard primaryButtonTitle={t.buttons.select} {...sharedProps} />
      )}
    </Modal>
  );
};

const editorPositionToOffset = (circleSize: number, circlePos: number) => {
  if (circleSize === 1) {
    return 0.5;
  }
  const offset = circlePos / (1 - circleSize);

  return Math.round(offset * 100) / 100;
};
