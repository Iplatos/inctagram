import { SVGProps, forwardRef, memo } from 'react';
export const AspectRatioSquare = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
      fill={'none'}
      height={22}
      ref={ref}
      width={22}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <rect height={20} rx={3} stroke={'currentColor'} strokeWidth={2} width={20} x={1} y={1} />
    </svg>
  ))
);
