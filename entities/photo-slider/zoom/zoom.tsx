import { FC, PropsWithChildren } from 'react';

import { Slider } from '@/shared/ui/slider/slider';
import { PopoverContentProps } from '@radix-ui/react-popover';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

export type ZoomProps = {
  popoverContentProps?: PropsWithChildren<PopoverContentProps>;
  setZoom: (value: number[]) => void;
  zoom: number;
};

export const Zoom: FC<ZoomProps> = ({ popoverContentProps, setZoom, zoom }) => (
  <PopoverRoot>
    <PopoverTrigger>
      <button aria-label={'Zoom'}>
        <TriggerButton variant={'zoom'} />
      </button>
    </PopoverTrigger>
    <PopoverContent {...popoverContentProps}>
      <Slider max={15} min={1} onValueChange={setZoom} size={'small'} value={[zoom]} />
    </PopoverContent>
  </PopoverRoot>
);
