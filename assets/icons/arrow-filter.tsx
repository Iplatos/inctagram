import React, { SVGProps, forwardRef, memo } from 'react';

export const ArrowFilter = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'currentColor'}
      height={12}
      width={8}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
      ref={ref}
    >
      <path
        d={'M4 0 .53 4.5h6.93L4 0ZM4 12l3.46-4.5H.53L4 12Z'}
        fill={'currentColor'}
        fillRule={'evenodd'}
      />
    </svg>
  ))
);
