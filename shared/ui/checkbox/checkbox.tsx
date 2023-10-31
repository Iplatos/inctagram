import React from 'react';
import style from './checkbox.module.scss';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import defaultSelectedImg from '../../../assets/icons/checkbox-default-selected.svg';
import defaultUnselectedImg from '../../../assets/icons/checkbox-default-unselected.svg';
import disabledSelectedImg from '../../../assets/icons/checkbox-disabled-selected.svg';
import disabledUnselectedImg from '../../../assets/icons/checkbox-disabled-unselected.svg';
import Image from 'next/image';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
  const { id, label, checked, disabled, onChange, required } = props;

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
        id="checkbox"
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <Image src={checkboxImage} alt="checkboxImage" />
      </CheckboxRadix.Root>

      <label className={style.checkboxLabel} htmlFor="checkbox">
        {label}
      </label>
    </div>
  );
};
