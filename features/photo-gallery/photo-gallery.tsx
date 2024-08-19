import React, { ElementRef, MouseEventHandler, ReactNode, useRef, useState } from 'react';
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
  const ref = useRef<ImageGallery>(null);

  return (
    <ImageGallery
      ref={ref}
      renderItem={({ original }) => (
        <Image
          alt={'user image'}
          height={560}
          src={original}
          style={{ objectFit: 'cover' }}
          width={490}
        />
      )}
      renderLeftNav={(onClick, disabled) => {
        const handleClick: MouseEventHandler<HTMLElement> = e => {
          onClick(e);

          // console.log(ref.current?.getCurrentIndex());
        };

        return <LeftNav disabled={disabled} onClick={handleClick} />;
      }}
      renderRightNav={(onClick, disabled) => {
        const handleClick: MouseEventHandler<HTMLElement> = e => {
          onClick(e);

          // console.log(ref.current?.getCurrentIndex());
        };

        return <RightNav disabled={disabled} onClick={handleClick} />;
      }}
      showBullets
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      {...props}
      additionalClass={clsx(style.container, additionalClass)}
    />
  );
};
