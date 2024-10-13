import { PhotoSliderCropArea } from '@/entities/photo-slider';

export const getCroppedImageDataURL = (
  src: string,
  cropArea: PhotoSliderCropArea,
  onCropDone: (dataURL: string) => void
) => {
  const { height, width, x, y } = cropArea;
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  const imageElement = new Image();
  let dataURL: string;

  imageElement.src = src;
  imageElement.onload = function () {
    context?.drawImage(imageElement, x, y, width, height, 0, 0, width, height);

    dataURL = canvas.toDataURL('image/jpeg');
    onCropDone(dataURL);
  };
};
