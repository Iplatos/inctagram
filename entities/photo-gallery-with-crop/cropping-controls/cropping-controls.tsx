import { FC } from 'react';

import {
  Crop,
  CropProps,
  Thumbnails,
  ThumbnailsProps,
  Zoom,
  ZoomProps,
} from '@/entities/photo-gallery-with-crop';

import style from './cropping-controls.module.scss';

export type PGWithCropCroppingControlsProps = { hidden?: boolean } & {
  cropProps: CropProps;
  thumbnailsProps: ThumbnailsProps;
  zoomProps: ZoomProps;
};

export const PGWithCropCroppingControls: FC<PGWithCropCroppingControlsProps> = ({
  cropProps,
  hidden = false,
  thumbnailsProps,
  zoomProps,
}) => {
  if (hidden) {
    return null;
  }

  return (
    <div className={style.customControls}>
      <div className={style.customControls__inner}>
        <Crop {...cropProps} />
        <Zoom {...zoomProps} />
      </div>
      <Thumbnails {...thumbnailsProps} />
    </div>
  );
};
