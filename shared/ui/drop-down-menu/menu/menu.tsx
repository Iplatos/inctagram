import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react';

import * as RadixDropDown from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import s from './menu.module.scss';

type MenuProps = {
  modal?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  portal?: boolean;
  trigger: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof RadixDropDown.Content>, 'asChild'>;

export const Menu = forwardRef<ElementRef<typeof RadixDropDown.Content>, MenuProps>(
  ({ children, className, modal, onOpenChange, open, portal = true, trigger, ...rest }, ref) => {
    const menuContent = (
      <RadixDropDown.Content
        className={clsx(s.content, className)}
        ref={ref}
        {...rest}
        onPointerDownOutside={e => {
          if (!portal) {
            e.detail.originalEvent.preventDefault();
          }
        }}
      >
        {children}
      </RadixDropDown.Content>
    );

    return (
      <RadixDropDown.Root modal={modal} onOpenChange={onOpenChange} open={open}>
        <RadixDropDown.Trigger asChild>{trigger}</RadixDropDown.Trigger>
        {portal ? <RadixDropDown.Portal>{menuContent}</RadixDropDown.Portal> : menuContent}
      </RadixDropDown.Root>
    );
  }
);
