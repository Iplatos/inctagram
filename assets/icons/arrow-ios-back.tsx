import { SVGProps, forwardRef, memo } from 'react';

export const ArrowIOSBack = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={24}
      ref={ref}
      width={24}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#a)'}>
        <path
          d={
            'M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1.001 1.001 0 1 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z'
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
