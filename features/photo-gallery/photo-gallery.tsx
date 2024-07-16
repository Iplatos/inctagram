import React, { ElementRef, ReactNode, useRef, useState } from 'react';
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';

import clsx from 'clsx';
import Image from 'next/image';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './photo-gallery.module.scss';

import { LeftNav } from '../photo-slider/controls/leftNav';
import { RightNav } from '../photo-slider/controls/rightNav';

export type PhotoGalleryPropsType = Omit<
  ReactImageGalleryProps,
  'showBullets' | 'showFullscreenButton' | 'showPlayButton' | 'showThumbnails'
>;

export const PhotoGallery = ({ additionalClass, ...props }: PhotoGalleryPropsType) => {
  return (
    <ImageGallery
      renderItem={({ original }) => (
        <Image
          alt={'user image'}
          height={490}
          src={original}
          style={{ objectFit: 'cover' }}
          width={400}
        />
      )}
      renderLeftNav={(onClick, disabled) => <LeftNav disabled={disabled} onClick={onClick} />}
      renderRightNav={(onClick, disabled) => <RightNav disabled={disabled} onClick={onClick} />}
      showBullets
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      {...props}
      additionalClass={clsx(style.container, additionalClass)}
    />
  );
};
