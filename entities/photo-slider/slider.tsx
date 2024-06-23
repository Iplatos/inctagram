import { ElementRef, useRef } from 'react';
import ImageGallery from 'react-image-gallery';

import { Thumbnails } from '@/features';
import { Crop } from '@/features/photo-slider/crop/crop';
import { Popover, PopoverContent, PopoverTrigger } from '@/features/photo-slider/popover';
import { Zoom } from '@/features/photo-slider/zoom/zoom';
import { CroppedImage } from '@/shared/ui/croppedImage';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { LeftNav } from './controls/leftNav';
import { RightNav } from './controls/rightNav';

const images = [
  {
    original: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
    // originalHeight: 490,
    // originalWidth: 503,
  },
  {
    original: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
    // originalHeight: 490,
    // originalWidth: 503,
  },
  {
    original: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
    // originalHeight: 490,
    // originalWidth: 503,
  },
];

export const PhotoSlider = () => {
  const refGallery = useRef<ElementRef<'div'>>(null);

  const renderCustomControls = () => (
    <div className={style.customControls}>
      {/* <div className={style.customControls__inner}>
        <Crop />
        <Zoom />
      </div>
      <Thumbnails boundary={refGallery.current} /> */}
    </div>
  );

  return (
    <div ref={refGallery} style={{ height: 500, maxWidth: 490 }}>
      <ImageGallery
        items={images}
        renderCustomControls={renderCustomControls}
        // renderItem={({ original, originalHeight, originalWidth }) => (
        //   <CroppedImage
        //     alt={''}
        //     height={originalHeight}
        //     scale={2}
        //     src={original}
        //     width={originalHeight}
        //   />
        // )}
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
