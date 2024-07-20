import {
  CSSProperties,
  ComponentProps,
  ElementRef,
  ElementType,
  JSX,
  JSXElementConstructor,
  ReactNode,
  forwardRef,
} from 'react';

import { capitalise } from '@/shared/helpers';
import { clsx } from 'clsx';

import s from './typography.module.scss';

export type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentProps<TTag>, 'ref'>
  : never;
export type ReactTag = JSXElementConstructor<any> | keyof JSX.IntrinsicElements;

export type TypographyProps<Ttag extends ReactTag> = {
  children: ReactNode;
  className?: string;
  color?: CSSProperties['color'];
  component?: Ttag;
} & PropsOf<Ttag>;

export const createTypography = <T extends ReactTag>(variant: TypographyVariant) => {
  const TypographyExoticComponent = forwardRef<ElementRef<T>, TypographyProps<T>>(
    ({ children, className, color, component, style, ...rest }, ref) => {
      const Component = component || TYPOGRAPHY_VARIANT_MAP[variant];

      const classNames = clsx(s[variant], className);

      const styles = {
        ...(color && { color }),
        ...style,
      };

      return (
        <Component className={classNames} ref={ref} style={styles} {...rest}>
          {children}
        </Component>
      );
    }
  );

  TypographyExoticComponent.displayName = `Typography.${capitalise(variant, true)}`;

  return TypographyExoticComponent;
};

export const Typography = {
  Bold14: createTypography('bold14'),
  Bold16: createTypography('bold16'),
  H1: createTypography('h1'),
  H2: createTypography('h2'),
  H3: createTypography('h3'),
  Large: createTypography('large'),
  Medium14: createTypography('medium14'),
  Regular12: createTypography('regular12'),
  Regular14: createTypography('regular14'),
  Regular16: createTypography('regular16'),
  RegularLink: createTypography('regularLink'),
  Semibold12: createTypography('semibold12'),
  SmallLink: createTypography('smallLink'),
};

const TYPOGRAPHY_VARIANT_MAP = {
  bold14: 'span',
  bold16: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'p',
  medium14: 'span',
  regular12: 'span',
  regular14: 'span',
  regular16: 'span',
  regularLink: 'a',
  semibold12: 'span',
  smallLink: 'a',
} as const;

type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANT_MAP;
