import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

export const ImageCropper = (props: any) => {
  const { image, onCropCancel, onCropDone } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div>
      <Cropper
        aspect={aspectRatio}
        crop={crop}
        image={image}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        zoom={zoom}
      />
    </div>
  );
};
