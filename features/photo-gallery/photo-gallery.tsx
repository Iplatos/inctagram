import { ElementRef, FC, ForwardedRef, PropsWithChildren } from 'react';
import ReactImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

import clsx from 'clsx';
import Image from 'next/image';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './photo-gallery.module.scss';

import { LeftNav } from '../photo-slider/controls/leftNav';
import { RightNav } from '../photo-slider/controls/rightNav';

export type PhotoGalleryProps = {
  galleryRef?: ForwardedRef<ReactImageGallery>;
  previewRef?: ForwardedRef<ElementRef<'img'>>;
} & ReactImageGalleryProps;

const PhotoGalleryRoot = ({
  additionalClass,
  galleryRef,
  previewRef,
  ...props
}: PhotoGalleryProps) => {
  return (
    <ReactImageGallery
      additionalClass={clsx(style.container, additionalClass)}
      ref={galleryRef}
      renderItem={({ original, originalAlt }) => (
        <PhotoGalleryPreviewImageWrapper>
          <Image
            alt={originalAlt ?? ''}
            className={'image-gallery-slide-image'}
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

export const PhotoGalleryPreviewImageWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className={'image-gallery-image-outer-wrapper'}>
    <div className={'image-gallery-image-inner-wrapper'}>{children}</div>
  </div>
);

export const PhotoGallery = Object.assign(PhotoGalleryRoot, {
  PreviewImageWrapper: PhotoGalleryPreviewImageWrapper,
});
