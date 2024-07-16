import { ElementRef, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import { Crop } from '@/entities/photo-slider/crop/crop';
import { ImageCropper } from '@/entities/photo-slider/image-cropper/image-cropper';
import { Thumbnails } from '@/entities/photo-slider/thumbnails';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { PhotoGallery } from '../photo-gallery';
import { LeftNav } from './controls/leftNav';
import { RightNav } from './controls/rightNav';

export const PhotoSlider = () => {
  const refGallery = useRef<ElementRef<'div'>>(null);

  const [image, setImage] = useState<string>('');
  const [addedImages, setAddedImages] = useState<string[]>([]);

  const [defaultAspectRatio, setDefaultAspectRatio] = useState<number | undefined>(undefined);
  const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio);

  const onAspectRatioChange = (value: 'original' | number) => {
    if (value == 'original') {
      setAspectRatio(defaultAspectRatio);
    } else {
      setAspectRatio(value);
    }
  };

  const [imgAfterCrop, setImgAfterCrop] = useState<string>('');

  const [zoom, setZoom] = useState<number>(1);

  const onCropDone = (imgCroppedArea: any) => {
    const canvasElem = document.createElement('canvas');

    canvasElem.width = imgCroppedArea.width;
    canvasElem.height = imgCroppedArea.height;

    const context = canvasElem.getContext('2d');

    const imageObj1 = new Image();

    imageObj1.src = image;
    imageObj1.onload = function () {
      context?.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasElem.toDataURL('image/jpeg');

      setImgAfterCrop(dataURL);
    };
  };

  // const onCropCancel = () => {
  //   setImage('');
  // };

  const renderCustomControls = () => (
    <div className={style.customControls}>
      <div className={style.customControls__inner}>
        <Crop onAspectRatioChange={onAspectRatioChange} />
        <Zoom setZoom={setZoom} zoom={zoom} />
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
    // <div ref={refGallery} style={{ width: '490px' }}>
    //   <ImageGallery
    //     items={addedImages.map(i => ({ original: i }))}
    //     renderCustomControls={renderCustomControls}
    //     renderItem={({ original }) => (
    //       <ImageCropper
    //         aspectRatio={aspectRatio}
    //         image={original}
    //         setDefaultAspectRatio={setDefaultAspectRatio}
    //         setZoom={setZoom}
    //         zoom={zoom}
    //       />
    //     )}
    //     renderLeftNav={(onClick, disabled) => <LeftNav disabled={disabled} onClick={onClick} />}
    //     renderRightNav={(onClick, disabled) => <RightNav disabled={disabled} onClick={onClick} />}
    //     showBullets
    //     showFullscreenButton={false}
    //     showPlayButton={false}
    //     showThumbnails={false}
    //   />
    // </div>

    <PhotoGallery
      items={addedImages.map(i => ({ original: i }))}
      renderCustomControls={renderCustomControls}
      renderItem={({ original }) => (
        <ImageCropper
          aspectRatio={aspectRatio}
          image={original}
          setDefaultAspectRatio={setDefaultAspectRatio}
          setZoom={setZoom}
          zoom={zoom}
        />
      )}
    />
  );
};
