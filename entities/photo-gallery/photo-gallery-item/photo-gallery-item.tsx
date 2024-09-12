import { ElementRef, forwardRef, memo } from 'react';
import { ReactImageGalleryItem } from 'react-image-gallery';

import { PhotoGalleryPreviewImageWrapper } from '@/entities/photo-gallery';
import { PhotoAspectRatio } from '@/shared/constants';
import clsx from 'clsx';
import Image from 'next/image';

export interface PhotoGalleryItem extends ReactImageGalleryItem {
  aspectRatio?: PhotoAspectRatio;
}

export const PhotoGalleryItemRender = memo(
  forwardRef<ElementRef<'img'>, PhotoGalleryItem>(({ aspectRatio, original, originalAlt }, ref) => {
    const getImageClassName = (hasAspectRatio?: boolean) => {
      const baseClassName = 'image-gallery-slide-image';

      return clsx(baseClassName, hasAspectRatio && `${baseClassName}-with-ar`);
    };

    console.log('render item');

    return (
      <PhotoGalleryPreviewImageWrapper aspectRatio={aspectRatio}>
        <Image
          alt={originalAlt ?? ''}
          className={getImageClassName(!!aspectRatio)}
          fill
          ref={ref}
          src={original}
        />
      </PhotoGalleryPreviewImageWrapper>
    );
  })
);
