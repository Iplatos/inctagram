import React, { ElementRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';

import style from './popover-root.module.scss';

export const PopoverContent = React.forwardRef<
  ElementRef<'div'>,
  PopoverPrimitive.PopoverContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={'end'}
        className={clsx(style.content, className)}
        ref={ref}
        side={'top'}
        sideOffset={4}
        sticky={'always'}
        {...props}
      >
        <div className={style.wrapper}>{children}</div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
