import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { TextField, TextFieldProps } from '@/shared/ui/textField';

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
} & Omit<TextFieldProps, 'onChange' | 'value'>;

export const ControlledTextField = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  });

  return <TextField {...props} {...field} error={error?.message} />;
};
