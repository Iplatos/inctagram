import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './input-adornment.module.scss';

type InputAdornmentProps = {
  children?: ReactNode;
  position: 'end' | 'start';
} & ComponentPropsWithoutRef<'div'>;

export const InputAdornment = forwardRef<ElementRef<'div'>, InputAdornmentProps>(
  ({ children, className, position, ...props }, ref) => {
    return (
      <div className={clsx(s[`${position}Adornment`], className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
