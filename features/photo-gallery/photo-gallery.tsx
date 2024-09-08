import { ElementRef, FC, ForwardedRef, PropsWithChildren } from 'react';
import ReactImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

import { PhotoAspectRatio } from '@/shared/constants';
import clsx from 'clsx';
import Image from 'next/image';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './photo-gallery.module.scss';

import { LeftNav } from '../photo-slider/controls/leftNav';
import { RightNav } from '../photo-slider/controls/rightNav';

export type PhotoGalleryProps = ReactImageGalleryProps & {
  aspectRatio?: PhotoAspectRatio;
  galleryRef?: ForwardedRef<ReactImageGallery>;
  previewRef?: ForwardedRef<ElementRef<'img'>>;
};

const PhotoGalleryRoot = ({
  additionalClass,
  aspectRatio,
  galleryRef,
  previewRef,
  ...props
}: PhotoGalleryProps) => {
  const getImageClassName = (aspectRatio?: boolean) => {
    const baseClassName = 'image-gallery-slide-image';

    return clsx(baseClassName, aspectRatio && `${baseClassName}-with-ar`);
  };

  return (
    <ReactImageGallery
      additionalClass={clsx(style.container, additionalClass)}
      ref={galleryRef}
      renderItem={({ original, originalAlt }) => (
        <PhotoGalleryPreviewImageWrapper aspectRatio={aspectRatio}>
          <Image
            alt={originalAlt ?? ''}
            className={getImageClassName(!!aspectRatio)}
            fill
            ref={previewRef}
            src={original}
          />
        </PhotoGalleryPreviewImageWrapper>
      )}
      renderLeftNav={(onClick, disabled) => <LeftNav disabled={disabled} onClick={onClick} />}
      renderRightNav={(onClick, disabled) => <RightNav disabled={disabled} onClick={onClick} />}
      showBullets
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      slideDuration={300}
      {...props}
    />
  );
};

export const PhotoGalleryPreviewImageWrapper: FC<
  PropsWithChildren<{ aspectRatio?: PhotoAspectRatio }>
> = ({ aspectRatio, children }) => {
  const getWrapperClassName = (wrapper: 'inner' | 'outer', aspectRatio?: PhotoAspectRatio) => {
    const baseClassName = `image-gallery-image-${wrapper}-wrapper`;

    return clsx(baseClassName, aspectRatio && `${baseClassName}-with-ar`);
  };

  const outerWrapperStyle = {
    ...(!!aspectRatio && ({ '--aspect-ratio': aspectRatio } as Record<string, string>)),
  };

  return (
    <div className={getWrapperClassName('outer', aspectRatio)} style={outerWrapperStyle}>
      <div className={getWrapperClassName('inner', aspectRatio)}>{children}</div>
    </div>
  );
};

export const PhotoGallery = Object.assign(PhotoGalleryRoot, {
  PreviewImageWrapper: PhotoGalleryPreviewImageWrapper,
});
