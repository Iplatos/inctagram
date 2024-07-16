import React, { SVGProps, forwardRef, memo } from 'react';

export const TrashOutline = memo(
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
        <clipPath id={'clip309_6046'}>
          <rect
            fill={'white'}
            fillOpacity={'0'}
            height={'24.000000'}
            id={'trash-outline'}
            width={'24.000000'}
          />
        </clipPath>
      </defs>
      <rect
        fill={'#FFFFFF'}
        fillOpacity={'0'}
        height={'24.000000'}
        id={'trash-outline'}
        width={'24.000000'}
      />
      <g clipPath={'url(#clip309_6046)'}>
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
            'M21 6L16 6L16 4.33C15.97 3.68 15.7 3.08 15.23 2.64C14.76 2.21 14.14 1.97 13.5 2L10.5 2C9.85 1.97 9.23 2.21 8.76 2.64C8.29 3.08 8.02 3.68 8 4.33L8 6L3 6C2.73 6 2.48 6.1 2.29 6.29C2.1 6.48 2 6.73 2 7C2 7.26 2.1 7.51 2.29 7.7C2.48 7.89 2.73 8 3 8L4 8L4 19C4 19.79 4.31 20.55 4.87 21.12C5.44 21.68 6.2 22 7 22L17 22C17.79 22 18.55 21.68 19.12 21.12C19.68 20.55 20 19.79 20 19L20 8L21 8C21.26 8 21.51 7.89 21.7 7.7C21.89 7.51 22 7.26 22 7C22 6.73 21.89 6.48 21.7 6.29C21.51 6.1 21.26 6 21 6ZM10 4.33C10 4.17 10.21 4 10.5 4L13.5 4C13.79 4 14 4.17 14 4.33L14 6L10 6L10 4.33ZM18 19C18 19.26 17.89 19.51 17.7 19.7C17.51 19.89 17.26 20 17 20L7 20C6.73 20 6.48 19.89 6.29 19.7C6.1 19.51 6 19.26 6 19L6 8L18 8L18 19Z'
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
