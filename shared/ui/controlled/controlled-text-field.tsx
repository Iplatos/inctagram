import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { assertUnreachable } from '@/shared/helpers/assertUnreachable';
import { TextField, TextFieldProps } from '@/shared/ui/textField';

type ControllerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};
type FilteredTextFieldProps<T extends TextFieldProps> = Omit<
  T,
  'error' | 'onBlur' | 'onChange' | 'value'
>;

// prettier-ignore
export type ControlledTextFieldProps<TFieldValues extends FieldValues> =
  | (ControllerProps<TFieldValues> &
  FilteredTextFieldProps<Extract<TextFieldProps, { as: "textarea" }>>)
  | (ControllerProps<TFieldValues> &
  FilteredTextFieldProps<Extract<TextFieldProps, { as?: "input" }>>);

export const ControlledTextField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  disabled,
  name,
  ...props
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, disabled, name });

  if (!props.as || props.as === 'input') {
    return <TextField {...props} error={error?.message} {...field} />;
  }

  if (props.as === 'textarea') {
    return <TextField {...props} error={error?.message} {...field} />;
  }

  assertUnreachable(props.as);
};
