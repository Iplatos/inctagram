import React, { ElementRef, ForwardedRef, ReactNode, Ref, forwardRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import style from './popover-root.module.scss';

type PopoverPropsType = {
  boundary?: PopoverPrimitive.PopoverContentProps['collisionBoundary'];
  children?: ReactNode;
  contentRef?: Ref<ElementRef<typeof PopoverPrimitive.Content>>;
  trigger?: ReactNode;
  triggerRef?: Ref<ElementRef<typeof PopoverPrimitive.Trigger>>;
};

export const PopoverContent = React.forwardRef(
  (
    { children, ...props }: PopoverPropsType,
    forwardedRef: ForwardedRef<ElementRef<typeof PopoverPrimitive.Content>>
  ) => {
    // console.log('collision boundary', props.boundary);

    return (
      <>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            {...props}
            align={'end'}
            className={style.content}
            ref={forwardedRef}
            side={'top'}
            sideOffset={2}
            sticky={'always'}
          >
            <div className={style.wrapper}>{children}</div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </>
    );
  }
);

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
