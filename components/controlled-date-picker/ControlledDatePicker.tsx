import { useState } from 'react';
import { Control, FieldPath, FieldValues, UseFormResetField, useController } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import {
  DatePickerContainer,
  DatePickerContainerProps,
} from '@/components/datePicker/datePickerContainer';
import { useDatePickerFormat } from '@/shared/hooks/useDatePickerFormat';

export type ControlledDatePickerProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
} & Omit<DatePickerContainerProps, 'calendarError' | 'inputError' | 'onChange' | 'value'>;

export const ControlledDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  disabled,
  name,
  resetField,
  ...props
}: ControlledDatePickerProps<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({ control, disabled, name });

  const { localeFormat } = useDatePickerFormat();
  const [dateFormatError, setDateFormatError] = useState<string | undefined>(undefined);

  const handleChange = (
    date: DateObject | DateObject[] | null,
    { isTyping }: { isTyping: boolean }
  ) => {
    if (date === null && isTyping) {
      setDateFormatError(`Неверный формат даты. Введите дату в указанном формате: ${localeFormat}`);
    } else {
      setDateFormatError(undefined);
    }

    onChange(date instanceof DateObject ? date.toDate() : null);
  };

  const handleClose = () => {
    if (dateFormatError) {
      setDateFormatError(undefined);
      resetField(name);
    }
    onBlur();
  };

  return (
    <DatePickerContainer
      calendarError={dateFormatError}
      fixMainPosition
      format={localeFormat}
      inputError={error?.message}
      onChange={handleChange}
      onClose={handleClose}
      value={value}
      {...props}
    />
  );
};
