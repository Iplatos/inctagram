import { FC } from 'react';

import { PropsWithoutChildren } from '@/shared/types/helpers';
import { Slider } from '@/shared/ui/slider/slider';
import { PopperContentProps } from '@radix-ui/react-popover';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

export type ZoomProps = {
  maxZoom?: number;

  minZoom?: number;
  onZoomChange: (zoom: number) => void;
  popoverContentProps?: PropsWithoutChildren<PopperContentProps>;
  zoom: number;
  zoomSpeed?: number;
};

export const Zoom: FC<ZoomProps> = ({
  maxZoom,
  minZoom,
  onZoomChange,
  popoverContentProps,
  zoom,
  zoomSpeed,
}) => (
  <PopoverRoot>
    <PopoverTrigger asChild>
      <TriggerButton variant={'zoom'} />
    </PopoverTrigger>
    <PopoverContent {...popoverContentProps}>
      <Slider
        max={maxZoom}
        min={minZoom}
        onValueChange={([zoom]) => onZoomChange(zoom)}
        size={'small'}
        step={zoomSpeed}
        value={[zoom]}
      />
    </PopoverContent>
  </PopoverRoot>
);
