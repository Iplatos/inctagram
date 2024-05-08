import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { clsx } from 'clsx';
import { v1 } from 'uuid';

import s from './slider.module.scss';

type SliderProps = {
  className?: string;
  thumbCount: 1 | 2;
  value: (null | number)[] | undefined;
};

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  Omit<ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, 'value'> & SliderProps
>(({ className, defaultValue, max, onValueChange, thumbCount, value, ...rest }, ref) => {
  const classNames = {
    container: clsx(s.container),
    range: clsx(s.range),
    root: clsx(s.root, className),
    thumb: clsx(s.thumb),
    track: clsx(s.track),
    valueDisplay: clsx(s.valueDisplay),
  };

  useEffect(() => {
    if (value?.[1] === undefined || value === null) {
      onValueChange?.([value?.[0] ?? 0, max ?? 0]);
    }
  }, [max, value, onValueChange]);

  return (
    <div className={classNames.container}>
      <SliderPrimitive.Root
        className={classNames.root}
        max={max}
        onValueChange={onValueChange}
        ref={ref}
        value={thumbCount === 2 ? [value?.[0] ?? 0, value?.[1] ?? max ?? 0] : [value?.[0] ?? 0]}
        {...rest}
      >
        <SliderPrimitive.Track className={classNames.track}>
          <SliderPrimitive.Range className={classNames.range} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={classNames.thumb} />
        {thumbCount === 2 && <SliderPrimitive.Thumb className={classNames.thumb} />}
      </SliderPrimitive.Root>
    </div>
  );
});
