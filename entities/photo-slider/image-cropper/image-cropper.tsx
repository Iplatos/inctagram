import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

export const ImageCropper = (props: any) => {
  const { aspectRatio, image, onCropCancel, onCropDone, setDefaultAspectRatio, setZoom, zoom } =
    props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
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
            // width: '490px',
            maxWidth: '490px',
            position: 'relative',
          },
        }}
        zoom={zoom}
      />
    </>
  );
};
