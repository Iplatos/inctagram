import React, { SVGProps, forwardRef, memo } from 'react';

export const EditOutline = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'none'}
      height={'24.000000'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'24.000000'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <desc>Created with Pixso.</desc>
      <defs>
        <clipPath id={'clip309_6041'}>
          <rect
            fill={'white'}
            fillOpacity={'0'}
            height={'24.000000'}
            id={'edit-2-outline'}
            width={'24.000000'}
          />
        </clipPath>
      </defs>
      <rect
        fill={'#FFFFFF'}
        fillOpacity={'0'}
        height={'24.000000'}
        id={'edit-2-outline'}
        width={'24.000000'}
      />
      <g clipPath={'url(#clip309_6041)'}>
        <g opacity={'0.000000'}>
          <path
            d={'M0 0L24 0L24 24L0 24L0 0Z'}
            fill={'#FFFFFF'}
            fillOpacity={'1.000000'}
            fillRule={'evenodd'}
            id={'Vector'}
          />
        </g>
        <path
          d={
            'M19 20L5 20C4.73 20 4.48 20.1 4.29 20.29C4.1 20.48 4 20.73 4 21C4 21.26 4.1 21.51 4.29 21.7C4.48 21.89 4.73 22 5 22L19 22C19.26 22 19.51 21.89 19.7 21.7C19.89 21.51 20 21.26 20 21C20 20.73 19.89 20.48 19.7 20.29C19.51 20.1 19.26 20 19 20Z'
          }
          fill={'#FFFFFF'}
          fillOpacity={'1.000000'}
          fillRule={'nonzero'}
          id={'Vector'}
        />
        <path
          d={
            'M5 18L5.08 18L9.26 17.62C9.71 17.57 10.14 17.37 10.47 17.04L19.47 8.04C19.81 7.68 20 7.18 19.99 6.68C19.98 6.17 19.76 5.69 19.4 5.34L16.66 2.59C16.3 2.26 15.83 2.07 15.34 2.05C14.85 2.04 14.37 2.21 14 2.53L5 11.53C4.67 11.85 4.47 12.28 4.43 12.74L4 16.91C3.98 17.05 4 17.2 4.05 17.34C4.1 17.48 4.18 17.6 4.29 17.7C4.38 17.8 4.49 17.87 4.61 17.92C4.73 17.97 4.86 18 5 18ZM15.27 4L18 6.73L16 8.67L13.32 6L15.27 4ZM6.37 12.91L12 7.31L14.7 10.02L9.1 15.62L6.1 15.9L6.37 12.91Z'
          }
          fill={'#FFFFFF'}
          fillOpacity={'1.000000'}
          fillRule={'nonzero'}
          id={'Vector'}
        />
      </g>
    </svg>
  ))
);
