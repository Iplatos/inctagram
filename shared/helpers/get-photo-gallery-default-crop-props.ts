import { PGWithCropCropProps } from '@/features/photo-gallery-with-crop';

export const getPhotoGalleryDefaultCropProps = (): PGWithCropCropProps => ({
  aspectRatio: 'original',
  maxZoom: 2,
  minZoom: 1,
  zoomSpeed: 0.1,
});
