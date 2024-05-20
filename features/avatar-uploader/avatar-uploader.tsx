import React, { ChangeEvent, ElementRef, FC, useRef } from 'react';
import AvatarEditor, { CroppedRect } from 'react-avatar-editor';

import { Modal } from '@/features/modal';
import { dataURLToBlob } from '@/shared/helpers';
import { Button } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import { CropProps } from '@/shared/ui/croppedImage';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import { AvatarFallback } from 'assets/icons/avatar-fallback';

import s from './avatar-uploader.module.scss';

import { useAvatarUploader } from './useAvatarUploader';

// TODO: add missing common components to index file in shared/ui
export type AvatarUploaderProps = {
  avatar?: File | string;
  initCropProps?: CropProps;
  onClose: () => void;
  onImageSave: (image: Blob, cropProps: CropProps & { mediaType: string }) => void;
  open: boolean;
};

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatar,
  initCropProps,
  onClose,
  onImageSave,
  open,
}) => {
  const editorRef = useRef<AvatarEditor>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);
  const {
    actions: {
      editorClosed,
      editorPositionChanged,
      editorPositionInitialized,
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
    dispatch(editorClosed());
    onClose();
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
      handleClose();

      return;
    }
    if (avatar) {
      const file = typeof avatar === 'string' ? dataURLToBlob(avatar) : avatar;

      onImageSave(file, { ...cropProps, mediaType: file.type });
      handleClose();
    }
  };

  const previewOrAvatar = state.preview ?? avatar;

  return (
    <Modal onClose={handleClose} open={open} showCloseButton title={'Add a Profile Photo'}>
      <div className={s.content}>
        {state.error && (
          <Alert classes={{ alertRoot: s.error }} severity={'error'}>
            <Typography.Regular14>
              <Trans
                tags={{ bold: ({ content }) => <Typography.Bold14>{content}</Typography.Bold14> }}
                text={state.error}
              />
            </Typography.Regular14>
          </Alert>
        )}

        {previewOrAvatar ? (
          <div className={s.canvasWrapper} onWheel={changeImageScale}>
            <div className={s.canvasBackground} />
            <AvatarEditor
              border={12}
              borderRadius={10_000}
              className={s.canvas}
              color={[23, 23, 23, 0.75]} // --color-dark-500 with transparency
              image={previewOrAvatar}
              onImageReady={initEditorPosition}
              onPositionChange={pos => dispatch(editorPositionChanged(pos))}
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

        <input
          accept={'image/png, image/jpeg'}
          onChange={uploadFromDevice}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
        <div className={s.buttonsGroup}>
          <Button
            onClick={() => inputRef.current?.click()}
            variant={previewOrAvatar ? 'tertiary' : 'primary'}
          >
            select from device
          </Button>
          {previewOrAvatar && (
            <Button disabled={!!state.error} onClick={saveAvatar}>
              save
            </Button>
          )}
        </div>
      </div>
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
