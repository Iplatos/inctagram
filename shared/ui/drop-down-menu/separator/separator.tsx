import { ComponentPropsWithoutRef } from 'react';

import * as RadixDropDown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import s from './separator.module.scss';

type Props = ComponentPropsWithoutRef<typeof RadixDropDown.Separator>;

export const Separator = ({ className, ...rest }: Props) => {
  return <RadixDropDown.Separator className={clsx(s.separator, className)} {...rest} />;
};
