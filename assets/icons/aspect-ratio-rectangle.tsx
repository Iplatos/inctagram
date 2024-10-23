import { SVGProps, forwardRef, memo } from 'react';
export const AspectRatioRectangle = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'none'}
      height={20}
      ref={ref}
      width={26}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <rect
        height={24}
        rx={2}
        stroke={'currentColor'}
        strokeWidth={2}
        transform={'rotate(90 25 1)'}
        width={18}
        x={25}
        y={1}
      />
    </svg>
  ))
);
