import React, { SVGProps, forwardRef, memo } from 'react';

export const DropdownArrow = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={10}
      ref={ref}
      width={339}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path d={'M323 8h16l-8-8-8 8Z'} fill={'#4C4C4C'} />
      <path d={'M323 9.5h16l-8-8-8 8Z'} fill={'#171717'} />
    </svg>
  ))
);
