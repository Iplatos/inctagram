import { PhotoGalleryCropProps } from '@/features/photo-slider';

export const getPhotoGalleryDefaultCropProps = (): PhotoGalleryCropProps => ({
  aspectRatio: 'original',
  maxZoom: 2,
  minZoom: 1,
  zoomSpeed: 0.1,
});
