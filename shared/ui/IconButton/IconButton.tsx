import React, { Component, ComponentProps, ComponentType, ReactNode } from 'react';

import s from './iconButton.module.scss';

export type IconButtonProps = {
  activeIcon?: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  size: 'large' | 'medium' | 'small';
} & ComponentProps<'button'>;

export const IconButton = (props: IconButtonProps & ComponentProps<'button'>) => {
  const { activeIcon, className, icon, isActive, onChange, ref, size, ...rest } = props;

  return (
    <button {...rest} className={s[size]} onClick={onChange}>
      {isActive && activeIcon}
      {!isActive && icon}
    </button>
  );
};
