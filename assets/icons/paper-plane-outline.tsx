import React, { SVGProps, forwardRef, memo } from 'react';

export const PaperPlaneOutline = memo(
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
        <clipPath id={'clip309_4826'}>
          <rect
            fill={'white'}
            fillOpacity={'0'}
            height={'24.000000'}
            id={'paper-plane-outline'}
            width={'24.000000'}
          />
        </clipPath>
      </defs>
      <rect
        fill={'#FFFFFF'}
        fillOpacity={'0'}
        height={'24.000000'}
        id={'paper-plane-outline'}
        width={'24.000000'}
      />
      <g clipPath={'url(#clip309_4826)'}>
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
            'M21 4C20.99 3.9 20.96 3.81 20.94 3.72L20.94 3.64C20.89 3.52 20.82 3.42 20.74 3.33C20.65 3.26 20.55 3.19 20.45 3.14L20.36 3.14C20.26 3.07 20.16 3.02 20.05 3L20 3C19.9 2.98 19.79 2.98 19.7 3L1.7 9C1.5 9.06 1.32 9.19 1.2 9.36C1.07 9.53 1.01 9.73 1.01 9.94C1.01 10.16 1.07 10.36 1.2 10.53C1.32 10.7 1.5 10.83 1.7 10.89L10.23 13.74L13.07 22.27C13.13 22.47 13.26 22.64 13.43 22.76C13.6 22.89 13.8 22.95 14.02 22.95C14.23 22.95 14.43 22.89 14.6 22.76C14.77 22.64 14.9 22.47 14.97 22.27L20.97 4.27C20.99 4.18 21 4.09 21 4ZM16.3 6.28L10.73 11.86L5.16 10L16.3 6.28ZM14 18.84L12.14 13.27L17.7 7.69L14 18.84Z'
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
