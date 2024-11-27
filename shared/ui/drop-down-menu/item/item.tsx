import { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import s from './item.module.scss';

export type DropDownMenuItemProps = {
  endIcon?: ReactNode;
  startIcon?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixDropdown.Item>;

export const DropDownMenuItem = ({
  children,
  className,
  endIcon,
  startIcon,
  ...rest
}: DropDownMenuItemProps) => {
  return (
    <RadixDropdown.Item className={clsx(s.item, className)} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </RadixDropdown.Item>
  );
};
