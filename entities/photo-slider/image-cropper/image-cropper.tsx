import React, { useState } from 'react';
import Cropper, { Area, CropperProps } from 'react-easy-crop';

type ImageCropperPropsType = {
  aspectRatio: number | undefined;
  image: string;
  initializeAspectRatio: (aspect: number) => void;
  setCroppedArea: (croppedAreaPixels: Area) => void;
  setZoom: (zoom: number) => void;
  zoom: number;
};

export const ImageCropper = (props: ImageCropperPropsType) => {
  const { aspectRatio, image, initializeAspectRatio, setCroppedArea, setZoom, zoom } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete: CropperProps['onCropComplete'] = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <>
      <Cropper
        aspect={aspectRatio}
        crop={crop}
        image={image}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onMediaLoaded={mediaSize => {
          initializeAspectRatio(mediaSize.naturalWidth / mediaSize.naturalHeight);
        }}
        onZoomChange={setZoom}
        style={{
          containerStyle: {
            backgroundColor: 'var(--color-dark-100)',
            height: '503px',
            margin: 0,
            maxWidth: '490px',
            position: 'relative',
          },
        }}
        zoom={zoom}
      />
    </>
  );
};
