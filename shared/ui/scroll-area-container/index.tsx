import { ReactNode } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';

export interface ScrollAreaContainerT {
  children?: ReactNode;
  orientation?: 'both' | 'horizontal' | 'vertical';
  scrollbarSize?: number;
  style?: string;
  thumbStyle?: string;
  type?: 'always' | 'auto' | 'hover' | 'scroll';
}

import clsx from 'clsx';

import s from './scroll-area-container.module.scss';

export const ScrollAreaContainer = ({
  children,
  orientation = 'vertical',
  scrollbarSize = 10,
  style,
  thumbStyle,
  type = 'auto',
}: ScrollAreaContainerT) => {
  const isVertical = orientation === 'vertical' || orientation === 'both';
  const isHorizontal = orientation === 'horizontal' || orientation === 'both';

  return (
    <ScrollArea.Root className={s.ScrollAreaRoot} type={type}>
      <ScrollArea.Viewport className={clsx(style, s.ScrollAreaViewport)}>
        {children}
      </ScrollArea.Viewport>
      {isVertical && (
        <ScrollArea.Scrollbar
          className={s.ScrollAreaScrollbar}
          orientation={'vertical'}
          style={{ width: scrollbarSize }}
        >
          <ScrollArea.Thumb className={clsx(thumbStyle, s.ScrollAreaThumb)} />
        </ScrollArea.Scrollbar>
      )}
      {isHorizontal && (
        <ScrollArea.Scrollbar
          className={s.ScrollAreaScrollbar}
          orientation={'horizontal'}
          style={{ height: scrollbarSize }}
        >
          <ScrollArea.Thumb className={clsx(thumbStyle, s.ScrollAreaThumb)} />
        </ScrollArea.Scrollbar>
      )}
    </ScrollArea.Root>
  );
};
