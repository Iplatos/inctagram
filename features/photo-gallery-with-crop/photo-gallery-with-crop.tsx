import { ElementRef, FC, useRef, useState } from 'react';

import { PhotoGalleryItem } from '@/entities/photo-gallery';
import {
  PGWithCropAspectRatio,
  PGWithCropCropArea,
  PGWithCropCroppingControls,
  PGWithCropItemRender,
  PGWithCropItemRenderProps,
  ThumbnailsProps,
} from '@/entities/photo-gallery-with-crop';
import { PhotoGallery, PhotoGalleryProps } from '@/features/photo-gallery';
import {
  adjustArrayIndexByBoundaries,
  getPhotoGalleryDefaultCropProps as getPhotoGalleryDCP,
} from '@/shared/helpers';
import { useEffectEvent } from '@/shared/hooks';

export type PGWithCropCropProps = {
  aspectRatio: PGWithCropAspectRatio;
  maxZoom: number;
  minZoom: number;
  zoomSpeed: number;
};

export type PGWithCropZoomHandler = (zoom: number, index: number) => void;
export type PGWithCropCropCompleteHandler = (
  cropArea: PGWithCropCropArea,
  cropAreaPixels: PGWithCropCropArea,
  index: number
) => void;
export type PGWithCropAspectRatioHandler = (
  aspectRatio: PGWithCropAspectRatio,
  index: number
) => void;

export type PGWithCropItem = Omit<PhotoGalleryItem, 'aspectRatio'> & {
  cropperProps?: Omit<PGWithCropItemRenderProps, 'src'>;
};

export type PhotoGalleryWithCropProps = {
  cropProps?: Partial<PGWithCropCropProps>;
  galleryProps?: Omit<PhotoGalleryProps, 'items'>;
  items: PGWithCropItem[];
  onAspectRatioChange?: PGWithCropAspectRatioHandler;
  onCropComplete?: PGWithCropCropCompleteHandler;
  onItemAdd?: ThumbnailsProps['onItemAdd'];
  onItemRemove?: (index: number) => true | void;
  onZoomChange?: PGWithCropZoomHandler;
  showCropperControls?: boolean;
};

// TODO: add "disabled" styles and behavior
export const PhotoGalleryWithCrop: FC<PhotoGalleryWithCropProps> = ({
  cropProps: globalCropProps,
  galleryProps = {},
  items,
  onAspectRatioChange,
  onCropComplete,
  onItemAdd,
  onItemRemove,
  onZoomChange,
  showCropperControls = true,
}) => {
  const { onSlide, startIndex, ...restGalleryProps } = galleryProps;
  const refGallery = useRef<ElementRef<'div'>>(null);

  const [currentIndex, setCurrentIndex] = useState(() =>
    adjustArrayIndexByBoundaries(items.length, startIndex)
  );

  const handleAspectRatioChange = (aspectRatio: PGWithCropAspectRatio) =>
    onAspectRatioChange?.(aspectRatio, currentIndex);

  const handleSlideChange = (currentIndex: number) => {
    onSlide?.(currentIndex);
    setCurrentIndex(currentIndex);
  };

  const handleItemRemove = (index: number) => {
    const shouldAdjustCurrentIndex = onItemRemove?.(index);

    // TODO: add description for this behavior
    if (shouldAdjustCurrentIndex) {
      const nextIndex = index <= currentIndex ? currentIndex - 1 : currentIndex;

      setCurrentIndex(adjustArrayIndexByBoundaries(items.length - 1, nextIndex));
    }
  };

  const handleCropComplete = useEffectEvent(
    (cropArea: PGWithCropCropArea, cropAreaPixels: PGWithCropCropArea) =>
      onCropComplete?.(cropArea, cropAreaPixels, currentIndex)
  );

  const handleZoomChange = useEffectEvent((zoom: number) => onZoomChange?.(zoom, currentIndex));

  const resolvedGlobalCropProps = { ...getPhotoGalleryDCP(), ...globalCropProps };
  const currentCropProps = items[currentIndex]?.cropperProps ?? {};

  const resolvedCurrentCropProps = (
    Object.keys(resolvedGlobalCropProps) as (keyof PGWithCropCropProps)[]
  ).reduce(
    (acc, key) => ({ ...acc, [key]: currentCropProps[key] ?? resolvedGlobalCropProps[key] }),
    {} as PGWithCropCropProps
  );

  const mappedItems = items.map<PhotoGalleryItem>(({ cropperProps, ...item }, index) => ({
    renderItem: ({ original }) => {
      return (
        <PGWithCropItemRender
          {...resolvedGlobalCropProps}
          onCropComplete={handleCropComplete}
          onZoomChange={handleZoomChange}
          selected={currentIndex === index}
          src={original}
          {...cropperProps}
        />
      );
    },
    ...item,
  }));

  return (
    <div ref={refGallery}>
      <PhotoGallery
        items={mappedItems}
        onSlide={handleSlideChange}
        renderCustomControls={() => (
          <PGWithCropCroppingControls
            cropProps={{
              onAspectRatioChange: handleAspectRatioChange,
              popoverContentProps: { align: 'start' },
              selectedAspectRatio: resolvedCurrentCropProps.aspectRatio,
            }}
            hidden={!showCropperControls}
            thumbnailsProps={{
              onItemAdd,
              onItemRemove: handleItemRemove,
              popoverContentProps: { collisionBoundary: refGallery.current },
              thumbnails: items.map(({ original, thumbnail }) => thumbnail ?? original),
            }}
            zoomProps={{
              onZoomChange: handleZoomChange,
              popoverContentProps: { align: 'start' },
              zoom: currentCropProps.zoom ?? resolvedCurrentCropProps.minZoom,
              ...resolvedCurrentCropProps,
            }}
          />
        )}
        startIndex={currentIndex}
        {...restGalleryProps}
      />
    </div>
  );
};
