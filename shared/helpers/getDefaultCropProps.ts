import { CropProps } from '../ui/croppedImage';

/**
 * Conventional helper to get the default value of `CropProps`.
 * @returns The `CropProps` instance with default params that is used to position the image within the `CroppedImage` component and others based on it. Returned value: `{ offsetX: 0.5, offsetY: 0.5, scale: 1 }`
 */
export const getDefaultCropProps = (): CropProps => ({ offsetX: 0.5, offsetY: 0.5, scale: 1 });
