import React, { FC, lazy } from 'react';
import style from './checkbox.module.scss';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { CheckIcon } from '@radix-ui/react-icons';

import activeSelectedImg from '../../../assets/icons/checkbox-active-selected.svg';
import activeUnselectedImg from '../../../assets/icons/checkbox-active-unselected.svg';

import defaultSelectedImg from '../../../assets/icons/checkbox-default-selected.svg';
import defaultUnselectedImg from '../../../assets/icons/checkbox-default-unselected.svg';

import disabledSelectedImg from '../../../assets/icons/checkbox-disabled-selected.svg';
import disabledUnselectedImg from '../../../assets/icons/checkbox-disabled-unselected.svg';

export type CheckboxProps = {
  id?: string;
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
};

// default
// active
// hover
// focus
// disabled

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  checked,
  disabled,
  onChange,
  required,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CheckboxRadix.Root className="CheckboxRoot" defaultChecked id="c1">
        <CheckboxRadix.Indicator className="CheckboxIndicator">
          <CheckIcon />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <label className="Label" htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  );
};
