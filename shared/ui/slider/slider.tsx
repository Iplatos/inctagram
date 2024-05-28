import type { SliderProps as SliderPrimitiveProps } from '@radix-ui/react-slider';

import { FC } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { clsx } from 'clsx';

import s from './slider.module.scss';

type SliderSize = 'medium' | 'small';
export type SliderSlot = 'range' | 'sliderRoot' | 'thumb' | 'track';
export type SliderClasses = { [P in SliderSlot]?: string };
type OwnProps = {
  classes?: SliderClasses;
  size?: SliderSize;
  thumbsCount?: number;
};

export type SliderProps = Omit<SliderPrimitiveProps, 'asChild' | 'className' | keyof OwnProps> &
  OwnProps;

export const Slider: FC<SliderProps> = ({ thumbsCount = 1, ...props }) => (
  <InnerComponent key={thumbsCount} thumbsCount={thumbsCount} {...props} />
);

const InnerComponent: FC<SliderProps> = ({
  classes = {},
  size = 'medium',
  thumbsCount = 1,
  ...rest
}) => {
  const cls = getClassNames(classes, size);

  return (
    <SliderPrimitive.Root className={cls.sliderRoot} {...rest}>
      <SliderPrimitive.Track className={cls.track}>
        <SliderPrimitive.Range className={cls.range} />
      </SliderPrimitive.Track>
      {new Array(thumbsCount).fill(0).map((_, i) => (
        <SliderPrimitive.Thumb className={cls.thumb} key={i} />
      ))}
    </SliderPrimitive.Root>
  );
};

const getClassNames = (classes: SliderClasses, size: SliderSize): SliderClasses => ({
  range: clsx(s.range, classes.range),
  sliderRoot: clsx(s.root, classes.sliderRoot, s[size]),
  thumb: clsx(s.thumb, classes.thumb),
  track: clsx(s.track, classes.track),
});
