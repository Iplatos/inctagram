import React from 'react';

import { Typography } from '@/shared/ui';
import * as Popover from '@radix-ui/react-popover';

import style from './crop.module.scss';

import SquareSvg from '../../../assets/icons/aspect-ratio-square.svg';
import OriginalSvg from '../../../assets/icons/uploadImg.svg';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover';
import { TriggerButton } from '../trigger-button/trigger-button';

export const Crop = () => {
  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Crop'}>
            <TriggerButton variant={'crop'} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={style.aspectRatio}>
            <span>Original</span>
            <OriginalSvg className={style.svg} />
          </div>
          <div className={style.aspectRatio}>
            <span>1:1</span>
            <SquareSvg className={style.svg} />
          </div>
          <div className={style.aspectRatio}>4:5</div>
          <div className={style.aspectRatio}>16:9</div>
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};
