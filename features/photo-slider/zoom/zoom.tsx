import React from 'react';

import { Slider } from '@/shared/ui/slider/slider';
import * as Popover from '@radix-ui/react-popover';

import style from '../thumbnails/thumbnails.module.scss';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover';
import { TriggerButton } from '../trigger-button/trigger-button';

export const Zoom = () => {
  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Zoom'}>
            <TriggerButton variant={'zoom'} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Slider />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};
