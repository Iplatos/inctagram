import React, { CSSProperties, FC, useMemo } from 'react';

import { getDefaultCropProps } from '@/shared/helpers/getDefaultCropProps';
import { resolveImageSrcToString } from '@/shared/helpers/resolveImageSrcToString';
import { clsx } from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { z } from 'zod';

import s from './croppedImage.module.scss';

const DEFAULT_CROP_PROPS = getDefaultCropProps();

export type CroppedImageSlot = 'image' | 'viewBox';
export type CroppedImageClasses = { [P in CroppedImageSlot]?: string };

// TODO: move the validation schema and `cropProps` type to separate files which can be used as a single source of truth

/**
 * Parameters used to crop an image inside its view box.
 *
 * @property `offsetX` - image offset relative to the _left_ side of its view box in the range from `0` to `1` of its width.
 * @property `offsetY` - image offset relative to the _top_ side of its view box in the range from `0` to `1` of its height.
 * @property `scale` - image size scale relative to its view box size in range from `1` to `2`, which defines both width and height.
 * */
export type CropProps = {
  offsetX: number;
  offsetY: number;
  scale: number;
};

export type CroppedImageProps = Omit<ImageProps, 'className'> & {
  classes?: CroppedImageClasses;
} & Partial<CropProps>;

export const CroppedImage: FC<CroppedImageProps> = ({
  classes = {},
  fill,
  height,
  offsetX = DEFAULT_CROP_PROPS.offsetX,
  offsetY = DEFAULT_CROP_PROPS.offsetY,
  scale = DEFAULT_CROP_PROPS.scale,
  style,
  width,
  ...props
}) => {
  const { cropProps: finalCropProps, errors } = useCropPropsValidation(offsetX, offsetY, scale);
  const imageSizeIsSetExplicitly = Boolean(fill || (width && height));

  ({ offsetX, offsetY, scale } = imageSizeIsSetExplicitly ? finalCropProps : DEFAULT_CROP_PROPS);

  if (!imageSizeIsSetExplicitly) {
    console.warn(getCropPropsError('implicitSize', props.src, errors));
  } else if (errors.length) {
    console.error(getCropPropsError('invalidCropProps', props.src, errors));
  }

  // Using the `style` instead of `className` ensures that the necessary CSS properties are not overwritten
  const viewBoxStyle: CSSProperties = {
    overflow: 'hidden',
    ...(fill ? { height: '100%', position: 'absolute', width: '100%' } : { height, width }),
  };

  // Once the scaling box has been scaled, we need to move it back by the scale value
  // to return the picture to its original position.
  // Since the offset is applied to the enlarged scaling box,
  // we need to convert the size increment of the original scaling box to the size increment of the enlarged box.
  const getScalingBoxOffset = (pos: number, scale: number) => (pos * scale - pos) / scale;
  const toCSSPercentage = (...args: number[]) => args.map(arg => arg * 100 + '%').join(' ');

  const scalingBoxOffsetX = getScalingBoxOffset(offsetX, scale) * -1;
  const scalingBoxOffsetY = getScalingBoxOffset(offsetY, scale) * -1;
  const scalingBoxStyle: CSSProperties = {
    display: 'block',
    height: toCSSPercentage(scale),
    position: 'relative',
    translate: toCSSPercentage(scalingBoxOffsetX, scalingBoxOffsetY),
    width: toCSSPercentage(scale),
  };

  const imageStyle: CSSProperties = {
    ...style,
    objectPosition: toCSSPercentage(offsetX, offsetY),
  };

  const cls = getClassNames(classes);
  const scaleImageSize = (size: `${number}` | number | undefined) =>
    size ? Number(size) * scale : size;

  return (
    <span className={cls.viewBox} style={viewBoxStyle}>
      <span className={s.scalingBox} style={scalingBoxStyle}>
        <Image
          className={cls.image}
          fill={fill}
          height={scaleImageSize(height)}
          style={imageStyle}
          width={scaleImageSize(width)}
          {...props}
        />
      </span>
    </span>
  );
};

const getClassNames = (classes: CroppedImageClasses): Required<CroppedImageClasses> => ({
  image: clsx(s.image, classes.image),
  viewBox: clsx(s.viewBox, classes.viewBox),
});

type ErrorReason = 'implicitSize' | 'invalidCropProps';
const getCropPropsError = (
  reason: ErrorReason,
  src: StaticImport | string,
  errors: z.ZodIssue[]
) => {
  // prettier-ignore
  const errorsMap: Record<ErrorReason, string> = {
    implicitSize: `CroppedImage with src "${resolveImageSrcToString(src)}" must have either a "fill" prop or both "width" and "height" props for cropping props to have an effect. Consider using the "Next/Image" component if you need the image to be sized to the size of its replaced content.`,
    invalidCropProps: [
      `CroppedImage with src "${resolveImageSrcToString(src)}" received wrong cropping props.`,
      ...errors.map(i => i.message),
      'Default cropping props have been restored.',
    ].join(' '),
  };

  return errorsMap[reason];
};

const useCropPropsValidation = (offsetX: number, offsetY: number, scale: number) =>
  useMemo((): { cropProps: CropProps; errors: z.ZodIssue[] } => {
    const getCommonNumberSchema = (value: number, min: number, max: number, field: string) => {
      const message = `"${field}" prop value should be between "${min}" and "${max}", received value is "${value}".`;

      return z.number().min(min, message).max(max, message);
    };

    const schema = z.object({
      offsetX: getCommonNumberSchema(offsetX, 0, 1, 'offsetX'),
      offsetY: getCommonNumberSchema(offsetY, 0, 1, 'offsetY'),
      scale: getCommonNumberSchema(scale, 1, 2, 'scale'),
    } satisfies Record<keyof CropProps, z.ZodTypeAny>);

    const result = schema.safeParse({ offsetX, offsetY, scale });

    if (!result.success) {
      return {
        cropProps: DEFAULT_CROP_PROPS,
        errors: result.error.issues,
      };
    }

    return {
      cropProps: { offsetX, offsetY, scale },
      errors: [],
    };
  }, [offsetX, offsetY, scale]);
