import { ElementRef, useRef, useState } from 'react';
import ReactEasyCropper from 'react-easy-crop';

import { Crop } from '@/entities/photo-slider/crop/crop';
import { Thumbnails } from '@/entities/photo-slider/thumbnails';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { PhotoGallery } from '../photo-gallery';

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
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
    <div ref={refGallery}>
    <PhotoGallery
      items={addedImages.map(i => ({ original: i }))}
      renderCustomControls={renderCustomControls}
      renderItem={({ original }) => (
          <PhotoGallery.PreviewImageWrapper>
            <ReactEasyCropper
              aspect={aspectRatio}
              crop={crop}
          image={original}
              onCropChange={setCrop}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                console.log('onCropComplete', croppedArea, croppedAreaPixels);
              }}
              onMediaLoaded={mediaSize => {
                console.log('onMediaLoaded', { mediaSize });

                setDefaultAspectRatio(mediaSize.naturalWidth / mediaSize.naturalHeight);
              }}
              onZoomChange={setZoom}
          zoom={zoom}
        />
          </PhotoGallery.PreviewImageWrapper>
      )}
    />
    </div>
  );
};
