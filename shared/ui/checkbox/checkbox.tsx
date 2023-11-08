import React from 'react';

import * as CheckboxRadix from '@radix-ui/react-checkbox';

import style from './checkbox.module.scss';

import DefaultSelectedImg from '../../../assets/icons/checkbox-default-selected.svg';
import DefaultUnselectedImg from '../../../assets/icons/checkbox-default-unselected.svg';
import DisabledSelectedImg from '../../../assets/icons/checkbox-disabled-selected.svg';
import DisabledUnselectedImg from '../../../assets/icons/checkbox-disabled-unselected.svg';

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

  let checkboxImage = <DefaultUnselectedImg />;

  if (checked) {
    checkboxImage = <DefaultSelectedImg />;
    if (disabled) {
      checkboxImage = <DisabledSelectedImg />;
    }
  } else if (disabled) {
    checkboxImage = <DisabledUnselectedImg />;
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
        <CheckboxRadix.Indicator>{checkboxImage}</CheckboxRadix.Indicator>
      </CheckboxRadix.Root>

      <label className={style.checkboxLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
