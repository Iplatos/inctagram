import React from 'react';

import * as CheckboxRadix from '@radix-ui/react-checkbox';
import Image from 'next/image';

import style from './checkbox.module.scss';

import defaultSelectedImg from '../../../assets/icons/checkbox-default-selected.svg';
import defaultUnselectedImg from '../../../assets/icons/checkbox-default-unselected.svg';
import disabledSelectedImg from '../../../assets/icons/checkbox-disabled-selected.svg';
import disabledUnselectedImg from '../../../assets/icons/checkbox-disabled-unselected.svg';

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

  let checkboxImage = defaultUnselectedImg;

  if (checked) {
    checkboxImage = defaultSelectedImg;
    if (disabled) {
      checkboxImage = disabledSelectedImg;
    }
  } else if (disabled) {
    checkboxImage = disabledUnselectedImg;
  }

  return (
    <div className={style.container}>
      <CheckboxRadix.Root
        className={style.checkboxRoot}
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        required={required}
      >
        <Image alt={'checkboxImage'} src={checkboxImage} />
      </CheckboxRadix.Root>

      <label className={style.checkboxLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
