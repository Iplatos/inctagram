export const PHOTO_ASPECT_RATIO = {
  FOUR_FIVE: '4 / 5',
  FOUR_THREE: '4 / 3',
  SIXTEEN_NINE: '16 / 9',
  SQUARE: '1 / 1',
} as const;

export type PhotoAspectRatioKeys = keyof typeof PHOTO_ASPECT_RATIO;
export type PhotoAspectRatio = (typeof PHOTO_ASPECT_RATIO)[PhotoAspectRatioKeys];
