import React from 'react';

import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { clsx } from 'clsx';
import Image from 'next/image';

import style from './checkbox.module.scss';

import { Typography } from '..';
import DefaultSelectedImgUrl from '../../../assets/icons/checkbox-default-selected.svg?url';
import DefaultUnselectedImgUrl from '../../../assets/icons/checkbox-default-unselected.svg?url';
import DisabledSelectedImgUrl from '../../../assets/icons/checkbox-disabled-selected.svg?url';
import DisabledUnselectedImgUrl from '../../../assets/icons/checkbox-disabled-unselected.svg?url';

export type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  id?: string;
  label?: string;
  onChange: (checked: boolean) => void;
  required?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, disabled, id, label, onChange, required } = props;

  let checkboxImage = DefaultUnselectedImgUrl;

  if (checked) {
    checkboxImage = DefaultSelectedImgUrl;
    if (disabled) {
      checkboxImage = DisabledSelectedImgUrl;
    }
  } else if (disabled) {
    checkboxImage = DisabledUnselectedImgUrl;
  }

  return (
    <div className={style.container}>
      <CheckboxRadix.Root
        className={`${style.checkboxRoot} ${disabled && style.disabled}`}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        required={required}
      >
        <Image alt={'checkbox'} src={checkboxImage} />
      </CheckboxRadix.Root>

      <label className={style.checkboxLabel} htmlFor={id}>
        <Typography.Regular14 className={`${disabled && style.labelDisabled}`}>
          {label}
        </Typography.Regular14>
      </label>
    </div>
  );
};
