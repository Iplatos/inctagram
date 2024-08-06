import React from 'react';

import { Slider } from '@/shared/ui/slider/slider';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

export const Zoom = (props: any) => {
  const { setZoom, zoom } = props;

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Zoom'}>
            <TriggerButton variant={'zoom'} />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Slider max={15} min={1} onValueChange={setZoom} size={'small'} value={[zoom]} />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};
