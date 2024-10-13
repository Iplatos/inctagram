import { memo, useRef, useState } from 'react';
import ReactEasyCropper, {
  Area,
  Point,
  CropperProps as ReactEasyCropperProps,
} from 'react-easy-crop';

import { PhotoGalleryPreviewImageWrapper } from '@/entities/photo-gallery';
import { PhotoAspectRatio } from '@/shared/constants';
import { roundNumber } from '@/shared/helpers';

const DEFAULT_CROP_OBJECT: PhotoSliderCropPoint = { x: 0, y: 0 };

export type PhotoSliderCropPoint = Point;
export type PhotoSliderCropArea = Area;
export type PhotoSliderRenderItemAspectRatio = 'original' | PhotoAspectRatio;

export type PhotoSliderItemRenderProps = Partial<Omit<ReactEasyCropperProps, 'aspect' | 'crop'>> & {
  aspectRatio?: PhotoSliderRenderItemAspectRatio;
  selected?: boolean;
  src: string;
};

export const PhotoSliderItemRender = memo(
  ({
    aspectRatio,
    onCropAreaChange,
    onCropChange,
    onCropComplete,
    onInteractionEnd,
    onZoomChange,
    selected,
    setMediaSize,
    src,
    ...props
  }: PhotoSliderItemRenderProps) => {
    // ReactEasyCrop re-calculates the crop size and position for multiple slides
    //  when switching the current slide, placing a new object in the local state.
    //  Therefore, the cropper position and media sizes are stored separately in the local state
    //  rather than in the object to eliminate unnecessary re-renders.
    const [cropPositionX, setCropPositionX] = useState(DEFAULT_CROP_OBJECT.x);
    const [cropPositionY, setCropPositionY] = useState(DEFAULT_CROP_OBJECT.y);
    const [mediaNaturalWidth, setMediaNaturalWidth] = useState(0);
    const [mediaNaturalHeight, setMediaNaturalHeight] = useState(0);

    const cropAreaPixelsRef = useRef<{
      cropArea: PhotoSliderCropArea;
      cropAreaPixels: PhotoSliderCropArea;
    }>({
      cropArea: { height: 0, width: 0, x: 0, y: 0 },
      cropAreaPixels: { height: 0, width: 0, x: 0, y: 0 },
    });

    const coerceAspectRatio = (aspectRatio: PhotoSliderRenderItemAspectRatio = 'original') => {
      let result: number;

      if (mediaNaturalWidth === 0 || mediaNaturalHeight === 0) {
        return undefined;
      }

      if (aspectRatio === 'original') {
        result = mediaNaturalWidth / mediaNaturalHeight;
      } else {
        const [vertical, horizontal] = aspectRatio.split(' / ').map(Number);

        result = vertical / horizontal;
      }

      return roundNumber(result);
    };

    const handleCropChange = ({ x, y }: PhotoSliderCropPoint) => {
      onCropChange?.({ x, y });
      // ReactEasyCropper implicitly calls the `handleCropChange` handler
      //  when the current slide is not displayed, resetting the user-set offset of the cropper.
      //  Therefore, we only allow the currently selected slide to be shifted.
      if (selected) {
        setCropPositionX(x);
        setCropPositionY(y);
      }
    };

    const handleCropAreaChange: ReactEasyCropperProps['onCropAreaChange'] = (
      cropArea,
      cropAreaPixels
    ) => {
      onCropAreaChange?.(cropArea, cropAreaPixels);
      cropAreaPixelsRef.current = { cropArea, cropAreaPixels };
    };

    // Callback `onCropComplete` is implicitly called for each slide several times
    //  during initialization and also when swiping the slide,
    //  this causes the slide to jerk when swiping.
    //  Therefore, the `onCropComplete` handler is called once at the `onInteractionEnd` event,
    //  and the intermediate data is stored in the ref object.
    const handleInteractionEnd = () => {
      const { cropArea, cropAreaPixels } = cropAreaPixelsRef.current;

      onInteractionEnd?.();
      onCropComplete?.(cropArea, cropAreaPixels);
    };

    const handleMediaSizeChange: ReactEasyCropperProps['setMediaSize'] = mediaObject => {
      const { naturalHeight, naturalWidth } = mediaObject;

      setMediaSize?.(mediaObject);
      setMediaNaturalWidth(naturalWidth);
      setMediaNaturalHeight(naturalHeight);
    };

    return (
      <PhotoGalleryPreviewImageWrapper>
        <ReactEasyCropper
          aspect={coerceAspectRatio(aspectRatio)}
          crop={{ x: cropPositionX, y: cropPositionY }}
          image={src}
          onCropAreaChange={handleCropAreaChange}
          onCropChange={handleCropChange}
          onInteractionEnd={handleInteractionEnd}
          onZoomChange={onZoomChange}
          setMediaSize={handleMediaSizeChange}
          {...props}
        />
      </PhotoGalleryPreviewImageWrapper>
    );
  }
);
