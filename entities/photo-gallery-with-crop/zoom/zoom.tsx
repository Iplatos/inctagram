import { FC } from 'react';

import { PropsWithoutChildren } from '@/shared/types/helpers';
import { Slider } from '@/shared/ui/slider/slider';
import { PopoverProps, PopperContentProps } from '@radix-ui/react-popover';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { TriggerButton } from '../trigger-button/trigger-button';

export type ZoomProps = {
  maxZoom?: number;

  minZoom?: number;
  onOpenChange?: PopoverProps['onOpenChange'];
  onZoomChange: (zoom: number) => void;
  popoverContentProps?: PropsWithoutChildren<PopperContentProps>;
  zoom: number;

  zoomSpeed?: number;
};

export const Zoom: FC<ZoomProps> = ({
  maxZoom,
  minZoom,
  onOpenChange,
  onZoomChange,
  popoverContentProps,
  zoom,
  zoomSpeed,
}) => (
  <PopoverRoot onOpenChange={onOpenChange}>
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
