import React, { useState } from 'react';
import Cropper, { Area, CropperProps } from 'react-easy-crop';

type ImageCropperPropsType = {
  aspectRatio: number | undefined;
  image: string;
  setCroppedArea: (croppedAreaPixels: Area) => void;
  setDefaultAspectRatio: (aspect: number) => void;
  setZoom: (zoom: number) => void;
  zoom: number;
};

export const ImageCropper = (props: ImageCropperPropsType) => {
  const { aspectRatio, image, setCroppedArea, setDefaultAspectRatio, setZoom, zoom } = props;

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
          setDefaultAspectRatio(mediaSize.naturalWidth / mediaSize.naturalHeight);
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
