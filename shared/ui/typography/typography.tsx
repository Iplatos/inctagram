import {
  ComponentProps,
  ElementType,
  JSXElementConstructor,
  ReactNode,
  CSSProperties,
  FC,
} from 'react';
import s from './typography.module.scss';
import { clsx } from 'clsx';

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

const createTypography = <T extends ReactTag>(
  basicClassName: Component
): FC<TypographyProps<T>> => {
  return ({ children, className, color, component, style, ...rest }) => {
    const Component = component || COMPONENTS[basicClassName] || 'span';

    const classNames = clsx(s[basicClassName], className);

    const styles = {
      ...(color && { color }),
      ...style,
    };

    return (
      <Component className={classNames} style={styles} {...rest}>
        {children}
      </Component>
    );
  };
};

export const Typography = {
  Large: createTypography('large'),
  H1: createTypography('h1'),
  H2: createTypography('h2'),
  H3: createTypography('h3'),
  Regular16: createTypography('regular16'),
  Bold16: createTypography('bold16'),
  Regular14: createTypography('regular14'),
  Medium14: createTypography('medium14'),
  Bold14: createTypography('bold14'),
  Regular12: createTypography('regular12'),
  Semibold12: createTypography('semibold12'),
  RegularLink: createTypography('regularLink'),
  SmallLink: createTypography('smallLink'),
};

const COMPONENTS = {
  large: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  regular16: 'span',
  bold16: 'span',
  regular14: 'span',
  medium14: 'span',
  bold14: 'span',
  regular12: 'span',
  semibold12: 'span',
  regularLink: 'a',
  smallLink: 'a',
} as const;

type Component = keyof typeof COMPONENTS;
