import { useController } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';

export type ControlledDatePickerProps = {
  control: any;
  error: any;
  name: any;
};
/*  <DatePickerContainer
    error={fieldState?.error?.message}
    label={'Date of birth'}
    onChange={(date, { input, validatedValue }) => {
      if (!validatedValue) {
        onChange(new Date(1911212121212, 0, 1));
      }
      if (date instanceof DateObject) {
        onChange(date.toDate());
      }
    }}*/
export const ControlledDatePicker = (props: ControlledDatePickerProps) => {
  const { field, fieldState } = useController({
    control: props.control,
    name: props.name,
  });

  console.log(props.error);
  console.log(fieldState.error);

  return (
    <DatePickerContainer
      {...props}
      {...field}
      error={fieldState?.error?.message}
      label={'Date of birth'}
      onChange={(date, { input, validatedValue }) => {
        if (!validatedValue) {
          field.onChange(new Date(1911212121212, 0, 1));
        }
        if (date instanceof DateObject) {
          field.onChange(date.toDate());
        }
      }}
    />
  );
};
