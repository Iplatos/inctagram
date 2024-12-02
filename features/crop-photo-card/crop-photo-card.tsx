import { FC } from 'react';

import { ArrowIOSBack } from '@/assets/icons/arrow-ios-back';
import {
  PhotoGalleryWithCrop,
  PhotoGalleryWithCropProps,
} from '@/features/photo-gallery-with-crop';
import { Button, IconButton, ModalCard, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './crop-photo-card.module.scss';
import modalCardS from '@/shared/ui/modal-card/modal-card.module.scss';

export type CropPhotoCardProps = {
  disabled?: boolean;
  galleryProps: PhotoGalleryWithCropProps;
  nextButtonTitle?: string;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  title: string;
};

export const CropPhotoCard: FC<CropPhotoCardProps> = ({
  disabled,
  galleryProps,
  nextButtonTitle = 'Next',
  onNextClick,
  onPrevClick,
  title,
}) => {
  return (
    <ModalCard.Root className={s.root}>
      <ModalCard.Header className={s.header}>
        <IconButton
          className={modalCardS.headerIconButtonFirst}
          disabled={disabled}
          onClick={onPrevClick}
          size={'medium'}
        >
          <ArrowIOSBack />
        </IconButton>
        <Typography.H2 className={modalCardS.headerTitle}>{title}</Typography.H2>
        <Button
          className={clsx(modalCardS.headerIconButtonLast, s.nextButton)}
          disabled={disabled}
          onClick={onNextClick}
          variant={'text'}
        >
          {nextButtonTitle}
        </Button>
      </ModalCard.Header>

      <ModalCard.Content className={s.content} ignoreHeader>
        <PhotoGalleryWithCrop {...galleryProps} />
      </ModalCard.Content>
    </ModalCard.Root>
  );
};
