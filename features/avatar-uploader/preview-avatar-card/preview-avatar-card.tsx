import { FC, Ref, WheelEventHandler, useRef } from 'react';
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';

import { Button } from '@/shared/ui';
import { AddPhotoCard, AddPhotoCardProps } from '@/widgets/addPhotoCard';
import clsx from 'clsx';

import s from './preview-avatar-card.module.scss';
import addPhotoCardS from '@/widgets/addPhotoCard/addPhotoCard.module.scss';

type OmittedAddPhotoCardProps = Omit<AddPhotoCardProps, 'onSecondaryClick'>;

type PreviewAvatarCardProps = OmittedAddPhotoCardProps & {
  avatarEditorProps: Pick<
    AvatarEditorProps,
    'onImageReady' | 'onPositionChange' | 'position' | 'scale'
  >;
  editorRef: Ref<AvatarEditor>;
  image: File | string;
  onChangeAvatarScale: WheelEventHandler<HTMLDivElement>;
  onSaveAvatar: () => void;
};

export const PreviewAvatarCard: FC<PreviewAvatarCardProps> = ({
  avatarEditorProps,
  disabled,
  editorRef,
  error,
  image,
  onChangeAvatarScale,
  onClose,
  onFileInputChange,
  onSaveAvatar,
  primaryButtonTitle = 'Primary',
  secondaryButtonTitle = 'Secondary',
  title,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <AddPhotoCard.Root>
      <AddPhotoCard.Header disabled={disabled} onClose={onClose} title={title} />

      <AddPhotoCard.Content error={error}>
        <div className={s.canvasPaddingBox}>
          <div
            className={clsx(s.canvasWrapper, disabled && s.canvasWrapperDisabled)}
            onWheel={onChangeAvatarScale}
          >
            <div className={s.canvasBackground} />
            <AvatarEditor
              border={12}
              borderRadius={10_000}
              className={s.canvas}
              color={[23, 23, 23, 0.75]} // --color-dark-500 with transparency
              image={image}
              ref={editorRef}
              style={{ aspectRatio: 1, height: 'auto', width: '100%' }}
              {...avatarEditorProps}
            />
          </div>
        </div>

        <div className={addPhotoCardS.adaptivePaddingBox}>
          <div className={addPhotoCardS.buttonsGroup}>
            <Button
              className={addPhotoCardS.button}
              disabled={!!error || disabled}
              onClick={onSaveAvatar}
            >
              {primaryButtonTitle}
            </Button>
            <Button
              className={addPhotoCardS.button}
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              variant={'tertiary'}
            >
              {secondaryButtonTitle}
            </Button>
            <input
              accept={'image/png, image/jpeg'}
              disabled={disabled}
              onChange={onFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          </div>
        </div>
      </AddPhotoCard.Content>
    </AddPhotoCard.Root>
  );
};
