import React, { ElementRef, ReactNode, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import Image from 'next/image';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './photo-gallery.module.scss';

import { LeftNav } from '../photo-slider/controls/leftNav';
import { RightNav } from '../photo-slider/controls/rightNav';

type PhotoGalleryPropsType = {
  images: string[];
  renderCustomControls?: () => ReactNode;
};

export const PhotoGallery = (props: PhotoGalleryPropsType) => {
  const { images, renderCustomControls } = props;

  const refGallery = useRef<ElementRef<'div'>>(null);

  // const [addedImages, setAddedImages] = useState<string[]>([]);

  return (
    <div ref={refGallery} style={{ width: 490 }}>
      <ImageGallery
        items={images.map(i => ({ original: i, originalHeight: 490 }))}
        renderCustomControls={renderCustomControls}
        renderItem={({ original }) => <Image alt={'user image'} src={original} />}
        renderLeftNav={(onClick, disabled) => <LeftNav disabled={disabled} onClick={onClick} />}
        renderRightNav={(onClick, disabled) => <RightNav disabled={disabled} onClick={onClick} />}
        showBullets
        showFullscreenButton={false}
        showPlayButton={false}
        showThumbnails={false}
      />
    </div>
  );
};
