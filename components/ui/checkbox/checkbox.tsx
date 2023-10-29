// import React, { FC, lazy } from 'react';
// import style from './checkbox.module.scss';
// import * as CheckboxRadix from '@radix-ui/react-checkbox';
// import * as Label from '@radix-ui/react-label';
// import { CheckIcon } from '@radix-ui/react-icons';

// export type CheckboxProps = {
//   id?: string;
//   label?: string;
//   checked: boolean;
//   disabled?: boolean;
//   onChange?: (checked: boolean) => void;
//   required?: boolean;
// };

// // default
// // active
// // hover
// // focus
// // disabled

// export const Checkbox: FC<CheckboxProps> = ({
//   id,
//   label,
//   checked,
//   disabled,
//   onChange,
//   required,
// }) => {
//   return (
//     <div className={style.container}>
//       <div className={style.checkboxWrapper}>
//         <CheckboxRadix.Root
//           id={id}
//           className={style.checkboxRoot}
//           checked={checked}
//           disabled={disabled}
//           onCheckedChange={onChange}
//           required={required}
//         >
//           <CheckboxRadix.Indicator
//             className={`${style.indicatorRadix} ${style.indicatorChecked}`}
//           ></CheckboxRadix.Indicator>
//         </CheckboxRadix.Root>
//       </div>

//       <Label.Root htmlFor={id} className={style.label}>
//         {label}
//       </Label.Root>
//     </div>
//   );
// };

import React, { FC, lazy } from 'react';
import style from './checkbox.module.scss';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import * as Label from '@radix-ui/react-label';
import { CheckIcon } from '@radix-ui/react-icons';

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
    <form>
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
    </form>
  );
};
