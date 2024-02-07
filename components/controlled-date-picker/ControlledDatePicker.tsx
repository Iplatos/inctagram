import { useState } from 'react';
import { Control, FieldPath, FieldValues, UseFormResetField, useController } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { transformTaggedString } from '@/shared/helpers/transformTaggedString';
import { useDateFormat } from '@/shared/hooks/useDateFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DatePicker, DatePickerProps } from '@/shared/ui/datePicker';

export type ControlledDatePickerProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
} & Omit<DatePickerProps, 'calendarError' | 'inputError' | 'onChange' | 'value'>;

const { interpolate } = transformTaggedString;

export const ControlledDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  disabled,
  name,
  resetField,
  ...props
}: ControlledDatePickerProps<TFieldValues>) => {
  const {
    t: { common: commonT, generalInformation: t },
  } = useTranslation();

  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController({ control, disabled, name });

  const { stringDateFormat } = useDateFormat();
  const [calendarError, setCalendarError] = useState<string | undefined>(undefined);

  const dateFormatError = interpolate(t.dateOfBirth.errors.invalidDateFormat, {
    format: () => stringDateFormat,
  });

  const handleChange = (
    date: DateObject | DateObject[] | null,
    { isTyping }: { isTyping: boolean }
  ) => {
    if (date === null && isTyping) {
      setCalendarError(dateFormatError);
    } else {
      setCalendarError(undefined);
    }

    onChange(date instanceof DateObject ? date.toDate() : null);
  };

  const handleClose = () => {
    if (calendarError) {
      setCalendarError(undefined);
      resetField(name);
    }
    onBlur();
  };

  return (
    <DatePicker
      calendarError={calendarError}
      fixMainPosition
      format={stringDateFormat}
      inputError={error?.message}
      locale={commonT.datePicker.locale}
      onChange={handleChange}
      onClose={handleClose}
      value={value}
      {...props}
    />
  );
};
