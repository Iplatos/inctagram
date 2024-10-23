import React, { SVGProps, forwardRef, memo } from 'react';

export const PaginationForward = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={16}
      ref={ref}
      width={16}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#a)'}>
        <path
          d={
            'M6.667 12.666a.666.666 0 0 1-.514-1.093L9.14 8 6.26 4.42a.667.667 0 0 1 .1-.94.667.667 0 0 1 .973.1l3.22 4a.667.667 0 0 1 0 .847l-3.333 4a.667.667 0 0 1-.553.24Z'
          }
        />
      </g>
      <defs>
        <clipPath id={'a'}>
          <path d={'M0 0h16v16H0z'} />
        </clipPath>
      </defs>
    </svg>
  ))
);
