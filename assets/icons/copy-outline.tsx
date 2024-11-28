import React, { SVGProps, forwardRef, memo } from 'react';

export const CopyOutline = memo(
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
      <defs>
        <clipPath id={'clip310_5269'}>
          <rect
            fill={'white'}
            fillOpacity={'0'}
            height={'24.000000'}
            id={'copy-outline'}
            width={'24.000000'}
          />
        </clipPath>
      </defs>
      <rect
        fill={'#FFFFFF'}
        fillOpacity={'0'}
        height={'24.000000'}
        id={'copy-outline'}
        width={'24.000000'}
      />
      <g clipPath={'url(#clip310_5269)'}>
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
            'M18 21L12 21C11.2 21 10.44 20.68 9.87 20.12C9.31 19.55 9 18.79 9 18L9 12C9 11.2 9.31 10.44 9.87 9.87C10.44 9.31 11.2 9 12 9L18 9C18.79 9 19.55 9.31 20.12 9.87C20.68 10.44 21 11.2 21 12L21 18C21 18.79 20.68 19.55 20.12 20.12C19.55 20.68 18.79 21 18 21ZM12 11C11.73 11 11.48 11.1 11.29 11.29C11.1 11.48 11 11.73 11 12L11 18C11 18.26 11.1 18.51 11.29 18.7C11.48 18.89 11.73 19 12 19L18 19C18.26 19 18.51 18.89 18.7 18.7C18.89 18.51 19 18.26 19 18L19 12C19 11.73 18.89 11.48 18.7 11.29C18.51 11.1 18.26 11 18 11L12 11Z'
          }
          fill={'#FFFFFF'}
          fillOpacity={'1.000000'}
          fillRule={'nonzero'}
          id={'Vector'}
        />
        <path
          d={
            'M9.73 15L5.66 15C4.96 14.99 4.28 14.71 3.78 14.21C3.28 13.71 3 13.03 3 12.33L3 5.67C3 4.96 3.28 4.28 3.78 3.78C4.28 3.28 4.96 3 5.66 3L12.33 3C13.03 3 13.71 3.28 14.21 3.78C14.71 4.28 14.99 4.96 15 5.67L15 9.39L13 9.39L13 5.67C13 5.49 12.92 5.32 12.8 5.19C12.67 5.07 12.5 5 12.33 5L5.66 5C5.49 5 5.32 5.07 5.19 5.19C5.07 5.32 5 5.49 5 5.67L5 12.33C5 12.5 5.07 12.67 5.19 12.8C5.32 12.92 5.49 13 5.66 13L9.73 13L9.73 15Z'
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
