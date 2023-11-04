import { ComponentProps, ElementType, JSXElementConstructor, ReactNode } from 'react';

import style from './typography.module.scss';

export type PropsOf<TTag extends ReactTag> = TTag extends ElementType
  ? Omit<ComponentProps<TTag>, 'ref'>
  : never;

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

export type TypographyVariantTypes =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular16'
  | 'bold16'
  | 'regular14'
  | 'medium14'
  | 'bold14'
  | 'regular12'
  | 'semibold12'
  | 'regularLink'
  | 'smallLink';

type TypographyPropsType = {
  children: ReactNode;
  component?: keyof JSX.IntrinsicElements;
};

const createTypography = (variant: TypographyVariantTypes) => {
  return ({ children, component }: TypographyPropsType) => {
    const Component = component || 'span';

    return <Component className={`${variant && style[variant]}`}>{children}</Component>;
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
