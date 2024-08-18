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

import s from './iconButton.module.scss';

export type IconButtonSize = 'large' | 'medium' | 'small';
type OwnProps<T extends ElementType> = {
  children?: ReactNode;
  className?: string;
  component?: T;
  disabled?: boolean;
  size?: IconButtonSize;
};

export type IconButtonProps<T extends ElementType> = Replace<
  ComponentPropsWithoutRef<T>,
  OwnProps<T>
>;

type IconButtonRenderType = {
  (props: IconButtonProps<'button'>, ref?: ForwardedRef<ElementRef<'button'>>): ReactNode;
  (props: IconButtonProps<ElementType>, ref?: ForwardedRef<ElementRef<ElementType>>): ReactNode;
};

export type IconButtonComponent = {
  <T extends ElementType = 'button'>(
    props: IconButtonProps<T> & { ref?: ForwardedRef<ElementRef<T>> }
  ): ReactNode;
};

const IconButtonRender: IconButtonRenderType = (
  { className, component: Component = 'button', size = 'medium', ...props },
  ref
) => (
  <Component
    className={clsx(s[size], props.disabled && s.disabled, className)}
    ref={ref}
    {...props}
  />
);

export const IconButton: IconButtonComponent = forwardRef(IconButtonRender);
