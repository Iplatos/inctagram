import { ElementRef, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import { Thumbnails } from '@/features';
import { Crop } from '@/features/photo-slider/crop/crop';
import { Popover, PopoverContent, PopoverTrigger } from '@/features/photo-slider/popover';
import { Zoom } from '@/features/photo-slider/zoom/zoom';
import { CroppedImage } from '@/shared/ui/croppedImage';
import { original } from '@reduxjs/toolkit';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { LeftNav } from './controls/leftNav';
import { RightNav } from './controls/rightNav';

const images = [
  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/707344/pexels-photo-707344.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/446462/pexels-photo-446462.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export const PhotoSlider = () => {
  const refGallery = useRef<ElementRef<'div'>>(null);

  const [image, setImage] = useState<string>('');
  const [addedImages, setAddedImages] = useState<string[]>([]);

  console.log(addedImages);

  const renderCustomControls = () => (
    <div className={style.customControls}>
      <div className={style.customControls__inner}>
        <Crop />
        <Zoom />
      </div>
      <Thumbnails
        addedImages={addedImages}
        boundary={refGallery.current}
        image={image}
        setAddedImages={setAddedImages}
        setImage={setImage}
      />
    </div>
  );

  return (
    <div ref={refGallery} style={{ width: '503px' }}>
      <ImageGallery
        //   />
        // renderItem={({ original, originalHeight, originalWidth }) => (
        //   <CroppedImage
        //     alt={''}
        //     height={originalHeight}
        //     scale={2}
        //     src={original}
        //     width={originalHeight}
        items={images.map(i => ({ original: i, originalHeight: 490 }))}
        renderCustomControls={renderCustomControls}
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
