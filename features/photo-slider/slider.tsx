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
  imgAfterCrop?: string;
  setAddedImages: (images: SetAddedImagesCallback | string[]) => void;
  setImgAfterCrop?: (imgAfterCrop: string) => void;
};

export const PhotoSlider = (props: SliderPropsType) => {
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

  const [zoom, setZoom] = useState<number>(1);

  const initializeAspectRatio = (aspect: number) => {
    setAspectRatio(aspect);
    setDefaultAspectRatio(aspect);
  };

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
    <>
      <PhotoGallery
        items={addedImages.map(i => ({ original: i }))}
        renderCustomControls={renderCustomControls}
        renderItem={({ original }) => (
          <ImageCropper
            aspectRatio={aspectRatio}
            image={original}
            initializeAspectRatio={initializeAspectRatio}
            setCroppedArea={setCroppedArea}
            setZoom={setZoom}
            zoom={zoom}
          />
        )}
      />
    </>
  );
};
