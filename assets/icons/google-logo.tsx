import React, { SVGProps, forwardRef, memo } from 'react';

export const GoogleLogo = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={36}
      ref={ref}
      width={36}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#a)'}>
        <path
          d={
            'M7.9 14.647A10.616 10.616 0 0 1 18 7.364c2.536 0 4.827.9 6.627 2.372L29.863 4.5C26.673 1.718 22.582 0 18 0A17.953 17.953 0 0 0 1.86 9.975l6.04 4.672Z'
          }
          fill={'#EA4335'}
        />
        <path
          d={
            'M24.06 27.019c-1.634 1.055-3.711 1.617-6.06 1.617-4.7 0-8.672-3.02-10.085-7.234l-6.059 4.6A17.947 17.947 0 0 0 18 36c4.399 0 8.603-1.564 11.751-4.5l-5.69-4.481Z'
          }
          fill={'#34A853'}
        />
        <path
          d={
            'M29.751 31.5c3.293-3.072 5.43-7.645 5.43-13.5 0-1.064-.163-2.21-.408-3.273H18v6.955h9.654c-.476 2.338-1.755 4.15-3.593 5.337l5.69 4.48Z'
          }
          fill={'#4A90E2'}
        />
        <path
          d={
            'M7.915 21.402A10.679 10.679 0 0 1 7.364 18c0-1.173.188-2.3.535-3.353L1.86 9.975C.655 12.391 0 15.113 0 18c0 2.88.667 5.595 1.856 8.003l6.06-4.601Z'
          }
          fill={'#FBBC05'}
        />
      </g>
      <defs>
        <clipPath id={'a'}>
          <path d={'M0 0h36v36H0z'} fill={'#fff'} />
        </clipPath>
      </defs>
    </svg>
  ))
);
