import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import s from './button.module.scss';

export type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text';
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props;

  return <Component className={`${s[variant]} ${className}`} {...rest} />;
};
