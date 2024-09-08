import React, { SVGProps, forwardRef, memo } from 'react';

export const PlusCircleOutline = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={24}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={24}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#a)'} fill={'#000'}>
        <path
          d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z'}
        />
        <path
          d={'M15 11h-2V9a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z'}
        />
      </g>
      <defs>
        <clipPath id={'a'}>
          <path d={'M0 0h24v24H0z'} />
        </clipPath>
      </defs>
    </svg>
  ))
);
