import { FC } from 'react';

import {
  Crop,
  CropProps,
  Thumbnails,
  ThumbnailsProps,
  Zoom,
  ZoomProps,
} from '@/entities/photo-slider';

import style from './cropping-controls.module.scss';

export type PhotoSliderCroppingControlsProps = { hidden?: boolean } & {
  cropProps: CropProps;
  thumbnailsProps: ThumbnailsProps;
  zoomProps: ZoomProps;
};

export const PhotoSliderCroppingControls: FC<PhotoSliderCroppingControlsProps> = ({
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
