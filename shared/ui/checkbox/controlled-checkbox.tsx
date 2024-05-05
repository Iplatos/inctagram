import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@/shared/ui/checkbox';

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onChange'>;

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  });

  return <Checkbox {...checkboxProps} {...field} checked={value} onChange={onChange} />;
};
