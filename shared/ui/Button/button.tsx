import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';

import { Replace } from '@/shared/types/helpers';
import clsx from 'clsx';

import s from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
type OwnProps<T extends ElementType> = {
  children?: ReactNode;
  className?: string;
  component?: T;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
};

export type ButtonProps<T extends ElementType> = Replace<ComponentPropsWithoutRef<T>, OwnProps<T>>;

type ButtonRenderType = {
  (props: ButtonProps<'button'>, ref?: ForwardedRef<ElementRef<'button'>>): ReactNode;
  (props: ButtonProps<ElementType>, ref?: ForwardedRef<ElementRef<ElementType>>): ReactNode;
};

export type ButtonComponent = {
  <T extends ElementType = 'button'>(
    props: ButtonProps<T> & { ref?: ForwardedRef<ElementRef<T>> }
  ): ReactNode;
};

export const ButtonRender: ButtonRenderType = (
  {
    className,
    component: Component = 'button',
    disabled,
    fullWidth,
    variant = 'primary',
    ...props
  },
  ref
) => {
  return (
    <Component
      className={clsx(s[variant], fullWidth && s.fullWidth, disabled && s.disabled, className)}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
};

export const Button: ButtonComponent = forwardRef(ButtonRender);
