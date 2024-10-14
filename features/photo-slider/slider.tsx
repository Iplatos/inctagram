import { ElementRef, FC, useRef, useState } from 'react';

import { PhotoGalleryItem } from '@/entities/photo-gallery';
import {
  PhotoSliderCropArea,
  PhotoSliderCroppingControls,
  PhotoSliderItemRender,
  PhotoSliderItemRenderProps,
  PhotoSliderRenderItemAspectRatio,
  ThumbnailsProps,
} from '@/entities/photo-slider';
import { PhotoGallery, PhotoGalleryProps } from '@/features/photo-gallery';
import {
  adjustArrayIndexByBoundaries,
  getPhotoGalleryDefaultCropProps as getPhotoGalleryDCP,
} from '@/shared/helpers';
import { useEffectEvent } from '@/shared/hooks';

export type PhotoGalleryCropProps = {
  aspectRatio: PhotoSliderRenderItemAspectRatio;
  maxZoom: number;
  minZoom: number;
  zoomSpeed: number;
};

export type PhotoSliderZoomHandler = (zoom: number, index: number) => void;
export type PhotoSliderCropCompleteHandler = (
  cropArea: PhotoSliderCropArea,
  cropAreaPixels: PhotoSliderCropArea,
  index: number
) => void;
export type PhotoSliderAspectRatioHandler = (
  aspectRatio: PhotoSliderRenderItemAspectRatio,
  index: number
) => void;

// TODO: think about "slider" naming including "PhotoGalleryWithCrop"
export type PhotoSliderItem = Omit<PhotoGalleryItem, 'aspectRatio'> & {
  cropperProps?: Omit<PhotoSliderItemRenderProps, 'src'>;
};

export type PhotoSliderProps = {
  cropProps?: Partial<PhotoGalleryCropProps>;
  galleryProps?: Omit<PhotoGalleryProps, 'items'>;
  items: PhotoSliderItem[];
  onAspectRatioChange?: PhotoSliderAspectRatioHandler;
  onCropComplete?: PhotoSliderCropCompleteHandler;
  onItemAdd?: ThumbnailsProps['onItemAdd'];
  onItemRemove?: (index: number) => true | void;
  onZoomChange?: PhotoSliderZoomHandler;
  showCropperControls?: boolean;
};

// TODO: add "disabled" styles and behavior
export const PhotoSlider: FC<PhotoSliderProps> = ({
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

  const handleAspectRatioChange = (aspectRatio: PhotoSliderRenderItemAspectRatio) =>
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
    (cropArea: PhotoSliderCropArea, cropAreaPixels: PhotoSliderCropArea) =>
      onCropComplete?.(cropArea, cropAreaPixels, currentIndex)
  );

  const handleZoomChange = useEffectEvent((zoom: number) => onZoomChange?.(zoom, currentIndex));

  const resolvedGlobalCropProps = { ...getPhotoGalleryDCP(), ...globalCropProps };
  const currentCropProps = items[currentIndex]?.cropperProps ?? {};

  const resolvedCurrentCropProps = (
    Object.keys(resolvedGlobalCropProps) as (keyof PhotoGalleryCropProps)[]
  ).reduce(
    (acc, key) => ({ ...acc, [key]: currentCropProps[key] ?? resolvedGlobalCropProps[key] }),
    {} as PhotoGalleryCropProps
  );

  const mappedItems = items.map<PhotoGalleryItem>(({ cropperProps, ...item }, index) => ({
    renderItem: ({ original }) => {
      return (
        <PhotoSliderItemRender
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
          <PhotoSliderCroppingControls
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
