import { ElementRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Area } from 'react-easy-crop';

import { Crop } from '@/entities/photo-slider/crop/crop';
import { ImageCropper } from '@/entities/photo-slider/image-cropper/image-cropper';
import { SetAddedImagesCallback, Thumbnails } from '@/entities/photo-slider/thumbnails';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { PhotoGallery } from '../photo-gallery';

type SliderPropsType = {
  addedImages: string[];
  onCropDone?: (imgCroppedArea: Area) => void;
  setAddedImages: (images: SetAddedImagesCallback | string[]) => void;
};
export type SliderRef = {
  saveCroppedImage: () => void;
};
export const PhotoSlider = forwardRef<SliderRef, SliderPropsType>((props, ref) => {
  const { addedImages, setAddedImages } = props;

  const refGallery = useRef<ElementRef<'div'>>(null);

  const [image, setImage] = useState<string>('');
  const [croppedArea, setCroppedArea] = useState<Area>();

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

  const onCropDone = (imgCroppedArea: Area) => {
    const canvasElem = document.createElement('canvas');

    canvasElem.width = imgCroppedArea.width;
    canvasElem.height = imgCroppedArea.height;

    const context = canvasElem.getContext('2d');

    const imageObj = new Image();

    imageObj.src = image;

    imageObj.onload = function () {
      if (!context) {
        return;
      }
      context.drawImage(
        imageObj,
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

  useImperativeHandle(ref, () => ({
    saveCroppedImage: () => {
      onCropDone(croppedArea);
    },
  }));

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
    <PhotoGallery
      items={addedImages.map(i => ({ original: i }))}
      renderCustomControls={renderCustomControls}
      renderItem={({ original }) => (
        <ImageCropper
          aspectRatio={aspectRatio}
          image={original}
          setCroppedArea={setCroppedArea}
          setDefaultAspectRatio={setDefaultAspectRatio}
          setZoom={setZoom}
          zoom={zoom}
        />
      )}
    />
  );
});
