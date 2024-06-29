import React, { SVGProps, forwardRef, memo } from 'react';

export const ArrowLeft = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'none'}
      height={'24.000000'}
      viewBox={'0 0 24 24'}
      width={'24.000000'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <g opacity={'0.000000'}>
        <path
          d={'M24 0L24 24L0 24L0 0L24 0Z'}
          fill={'#FFFFFF'}
          fillOpacity={'1.000000'}
          fillRule={'evenodd'}
          id={'Vector'}
        />
      </g>
      <path
        d={
          'M13.83 19C13.68 19 13.53 18.96 13.39 18.9C13.26 18.83 13.14 18.74 13.05 18.62L8.22 12.62C8.07 12.45 7.99 12.22 7.99 11.99C7.99 11.76 8.07 11.53 8.22 11.36L13.22 5.36C13.39 5.15 13.63 5.02 13.89 5C14.16 4.97 14.42 5.06 14.63 5.23C14.83 5.4 14.96 5.64 14.98 5.9C15.01 6.17 14.92 6.43 14.76 6.64L10.29 12L14.61 17.36C14.73 17.5 14.81 17.68 14.83 17.87C14.85 18.06 14.82 18.25 14.74 18.42C14.66 18.6 14.53 18.74 14.37 18.84C14.2 18.95 14.02 19 13.83 19Z'
        }
        fill={'#FFFFFF'}
        fillOpacity={'1.000000'}
        fillRule={'nonzero'}
        id={'Vector'}
      />
    </svg>
  ))
);
