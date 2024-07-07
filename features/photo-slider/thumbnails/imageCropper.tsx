import React, { ChangeEvent, useState } from 'react';
import Cropper from 'react-easy-crop';

import clsx from 'clsx';

import style from './imageCropper.module.scss';

export const ImageCropper = (props: any) => {
  const { aspectRatio, image, onCropCancel, onCropDone, setDefaultAspectRatio } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className={style.container}>
      <Cropper
        aspect={aspectRatio}
        crop={crop}
        image={image}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onMediaLoaded={mediaSize => {
          setDefaultAspectRatio(mediaSize.naturalWidth / mediaSize.naturalHeight);
        }}
        onZoomChange={setZoom}
        style={{
          containerStyle: {
            backgroundColor: 'var(--color-dark-100)',
            height: '503px',
            margin: 0,
            position: 'relative',
            width: '490px',
          },
          // cropAreaStyle: {
          //   width: '490px',
          // },
        }}
        zoom={zoom}
      />
    </div>
  );
};
