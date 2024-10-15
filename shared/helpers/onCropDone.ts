import { Area } from 'react-easy-crop';

export const onCropDone = (
  imgCroppedArea: Area,
  image: string,
  setImgAfterCrop: (dataURL: string) => void
) => {
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
