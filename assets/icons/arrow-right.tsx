import React, { SVGProps, forwardRef, memo } from 'react';

export const ArrowRight = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={24}
      viewBox={'0 0 24 24'}
      width={24}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
      ref={ref}
    >
      <g clipPath={'url(#a)'}>
        <path
          d={
            'M10 19a1 1 0 0 1-.77-1.64L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19Z'
          }
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
