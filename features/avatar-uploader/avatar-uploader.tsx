import React, { ChangeEvent, ElementRef, FC, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

import { Modal } from '@/features/modal';
import { dataURLToBlob } from '@/shared/helpers';
import { Button } from '@/shared/ui';
import { Alert } from '@/shared/ui/alert';
import { CropProps } from '@/shared/ui/croppedImage';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import { AvatarFallback } from 'assets/icons/avatar-fallback';

import s from './avatar-uploader.module.scss';

import {
  canvasInitialized,
  canvasPositionChanged,
  castCroppedSizeToOffsetProp,
  modalClosed,
  previewAdded,
  scaleChanged,
  useAvatarUploader,
} from './useAvatarUploader';

// TODO: add missing common components to index file in shared/ui
export type AvatarUploaderProps = {
  avatar?: File | string;
  cropProps?: CropProps;
  onClose: () => void;
  onImageSave: (image: Blob, cropProps: CropProps) => void;
  open: boolean;
};

const defaultCropProps = { offsetX: 0.5, offsetY: 0.5, scale: 1 };

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatar,
  cropProps = defaultCropProps,
  onClose,
  onImageSave,
  open,
}) => {
  const [state, dispatch] = useAvatarUploader();

  const editorRef = useRef<AvatarEditor>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const previewOrAvatar = state.preview ?? avatar;

  const changeImageScale = (e: React.WheelEvent<HTMLDivElement>) => {
    const offset = e.deltaY > 0 ? -0.1 : 0.1;

    dispatch(scaleChanged(offset));
  };

  const handleClose = () => {
    dispatch(modalClosed());
    onClose();
  };

  const uploadPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const preview = e.target.files?.[0];

    if (!preview) {
      return;
    }

    dispatch(previewAdded(preview));
  };

  const adjustCanvasCropping = () => {
    const canvas = editorRef.current;

    if (!canvas) {
      return;
    }

    // TODO: fix a bug where the canvas position is retained even when loading a new preview
    // TODO: add helper to receive default cropProps
    dispatch(
      canvasInitialized({
        ...canvas.getCroppingRect(),
        ...(avatar ? cropProps : defaultCropProps),
      })
    );
  };

  const saveAvatar = () => {
    const canvas = editorRef.current;

    if (!canvas || !previewOrAvatar) {
      return;
    }

    const { height, width, x, y } = canvas.getCroppingRect();

    const file =
      typeof previewOrAvatar === 'string' ? dataURLToBlob(previewOrAvatar) : previewOrAvatar;

    onImageSave(file, {
      offsetX: castCroppedSizeToOffsetProp(width, x),
      offsetY: castCroppedSizeToOffsetProp(height, y),
      scale: state.cropProps.scale,
    });
    handleClose();
  };

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
              onImageReady={adjustCanvasCropping}
              onPositionChange={pos => dispatch(canvasPositionChanged(pos))}
              position={state.canvasPosition}
              ref={editorRef}
              scale={state.cropProps.scale}
              style={{ aspectRatio: 1, height: 'auto', width: '100%' }}
            />
          </div>
        ) : (
          <div className={s.placeholder}>
            <AvatarFallback className={s.image} />
          </div>
        )}

        <input onChange={uploadPreview} ref={inputRef} style={{ display: 'none' }} type={'file'} />
        <div className={s.buttonsGroup}>
          {!state.preview && (
            <Button onClick={() => inputRef.current?.click()}>select from device</Button>
          )}
          {previewOrAvatar && <Button onClick={saveAvatar}>save</Button>}
        </div>
      </div>
    </Modal>
  );
};
