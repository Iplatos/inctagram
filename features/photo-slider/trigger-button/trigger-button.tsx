import React from 'react';

import CropImg from 'assets/icons/cropImg.svg';
import UploadImg from 'assets/icons/plus-circle-outline.svg';
import Img from 'assets/icons/uploadImg.svg';
import ZoomImg from 'assets/icons/zoomImg.svg';

import style from './trigger-button.module.scss';

type TriggerPropsType = {
  variant: 'crop' | 'image' | 'upload' | 'zoom';
};

export const TriggerButton = (props: TriggerPropsType) => {
  const { variant } = props;

  let button;

  if (variant === 'crop') {
    button = <CropImg className={style.svg} />;
  } else if (variant === 'image') {
    button = <Img className={style.svg} />;
  } else if (variant === 'zoom') {
    button = <ZoomImg className={style.svg} />;
  } else {
    button = <UploadImg className={style.svg} />;
  }

  return (
    <button className={variant === 'upload' ? style.buttonPlus : style.button} type={'button'}>
      {button}
    </button>
  );
};
