import { ForwardedRef } from 'react';
import ReactImageGallery, {
  ReactImageGalleryItem,
  ReactImageGalleryProps,
} from 'react-image-gallery';

import {
  type PhotoGalleryItem,
  PhotoGalleryItemRender,
  PhotoGalleryPreviewImageWrapper,
} from '@/entities/photo-gallery';
import { PhotoAspectRatio } from '@/shared/constants';
import { Replace } from '@/shared/types/helpers';
import clsx from 'clsx';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './photo-gallery.module.scss';

import { LeftNav } from './controls/leftNav';
import { RightNav } from './controls/rightNav';

export type PhotoGalleryProps = Replace<
  ReactImageGalleryProps,
  {
    aspectRatio?: PhotoAspectRatio;
    galleryRef?: ForwardedRef<ReactImageGallery>;
    items: PhotoGalleryItem[];
  }
>;

const PhotoGalleryRoot = ({
  additionalClass,
  aspectRatio: globalAspectRatio,
  galleryRef,
  items,
  ...props
}: PhotoGalleryProps) => {
  const itemsWithCustomRender = items.map<ReactImageGalleryItem>(({ aspectRatio, ...item }) => {
    const renderSpecificItem: ReactImageGalleryProps['renderItem'] = props => (
      <PhotoGalleryItemRender aspectRatio={aspectRatio ?? globalAspectRatio} {...props} />
    );

    // `renderSpecificItem` is used by default if `renderItem` prop is not passed to the component,
    // either as a separate prop (to replace the render function for all slides) or as part of the `items` array
    // (to render each slide individually).
    // If either or both of these props are passed, they are applied as specified in the `ReactImageGallery` documentation.
    // That is, `renderItem` (specific) > `renderItem` (general)
    return {
      renderItem: props.renderItem ? undefined : renderSpecificItem,
      ...item,
    };
  });

  return (
    <ReactImageGallery
      additionalClass={clsx(style.container, additionalClass)}
      items={itemsWithCustomRender}
      ref={galleryRef}
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

export const PhotoGallery = Object.assign(PhotoGalleryRoot, {
  PreviewImageWrapper: PhotoGalleryPreviewImageWrapper,
});
