import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import s from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text';
export type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props;

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest} />
  );
};
