import React, { ChangeEvent, ElementRef, FC, useRef } from 'react';
import AvatarEditor, { CroppedRect } from 'react-avatar-editor';

import { dataURLToBlob } from '@/shared/helpers';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import { CropProps } from '@/shared/ui/croppedImage';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import { AvatarFallback } from 'assets/icons/avatar-fallback';
import clsx from 'clsx';

import s from './avatar-uploader.module.scss';

import { ConfirmModal } from '../confirm-modal';
import { useAvatarUploader } from './useAvatarUploader';

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
  onImageSave: (image: Blob, cropProps: CropProps & { mediaType: string }) => void;
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
  const inputRef = useRef<ElementRef<'input'>>(null);
  const {
    actions: {
      editorClosed,
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

  const saveAvatar = () => {
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

    if (state.preview) {
      onImageSave(state.preview, { ...cropProps, mediaType: state.preview.type });

      return;
    }
    if (avatar) {
      const file = typeof avatar === 'string' ? dataURLToBlob(avatar) : avatar;

      onImageSave(file, { ...cropProps, mediaType: file.type });
    }
  };

  const previewOrAvatar = state.preview ?? avatar;

  return (
    <ConfirmModal
      classes={{ button: s.button, buttonsGroup: s.buttonsGroup }}
      disabled={disabled}
      headerTitle={t.title}
      onCancel={handleClose}
      onConfirm={saveAvatar}
      open={open}
      renderCancelButton={({ className, disabled }) => (
        <Button
          {...{ className, disabled }}
          component={'label'}
          variant={previewOrAvatar ? 'tertiary' : 'primary'}
        >
          <input
            accept={'image/png, image/jpeg'}
            disabled={disabled}
            onChange={uploadFromDevice}
            style={{ display: 'none' }}
            type={'file'}
          />
          {t.buttons.select}
        </Button>
      )}
      renderConfirmButton={({ className, disabled }) =>
        previewOrAvatar && (
          <Button className={className} disabled={!!state.error || disabled} onClick={saveAvatar}>
            {t.buttons.save}
          </Button>
        )
      }
    >
      <div className={s.content}>
        {state.error && (
          <Alert classes={{ alertRoot: s.error }} severity={'error'}>
            {state.error}
          </Alert>
        )}

        {previewOrAvatar ? (
          <div
            className={clsx(s.canvasWrapper, disabled && s.canvasWrapperDisabled)}
            onWheel={changeImageScale}
          >
            <div className={s.canvasBackground} />
            <AvatarEditor
              border={12}
              borderRadius={10_000}
              className={s.canvas}
              color={[23, 23, 23, 0.75]} // --color-dark-500 with transparency
              image={previewOrAvatar}
              onImageReady={initEditorPosition}
              onPositionChange={pos => {
                if (!disabled) {
                  dispatch(editorPositionChanged(pos));
                }
              }}
              position={state.editorPosition}
              ref={editorRef}
              scale={state.scale}
              style={{ aspectRatio: 1, height: 'auto', width: '100%' }}
            />
          </div>
        ) : (
          <div className={s.placeholder}>
            <AvatarFallback className={s.image} />
          </div>
        )}
        {/* TODO: Add a slider so that users on touch devices can adjust the avatar's scale */}
      </div>
    </ConfirmModal>
  );
};

const editorPositionToOffset = (circleSize: number, circlePos: number) => {
  if (circleSize === 1) {
    return 0.5;
  }
  const offset = circlePos / (1 - circleSize);

  return Math.round(offset * 100) / 100;
};
