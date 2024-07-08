import React from 'react';

import { Typography } from '@/shared/ui';

import style from './crop.module.scss';

import OriginalSvg from '../../../assets/icons/uploadImg.svg';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover';
import { TriggerButton } from '../trigger-button/trigger-button';

type CropPropsType = {
  onAspectRatioChange: (value: 'original' | number) => void;
};

export const Crop = (props: CropPropsType) => {
  const { onAspectRatioChange } = props;

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Crop'}>
            <TriggerButton variant={'crop'} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={style.content}>
            <div className={style.aspectRatio} onClick={() => onAspectRatioChange('original')}>
              <Typography.Regular16 className={style.text}>Original</Typography.Regular16>
              <OriginalSvg className={style.svg} />
            </div>

            <div className={style.aspectRatio} onClick={() => onAspectRatioChange(1 / 1)}>
              <Typography.Regular16 className={style.text}>1:1</Typography.Regular16>
              <div className={style.aspectRatio_square}></div>
            </div>

            <div className={style.aspectRatio} onClick={() => onAspectRatioChange(4 / 5)}>
              <Typography.Regular16 className={style.text}>4:5</Typography.Regular16>
              <div className={style.aspectRatio_vertical}></div>
            </div>
            <div className={style.aspectRatio} onClick={() => onAspectRatioChange(16 / 9)}>
              <Typography.Regular16 className={style.text}>16:9</Typography.Regular16>
              <div className={style.aspectRatio_horizontal}></div>
            </div>
          </div>
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};
