import { useState } from 'react';
import { Control, FieldPath, FieldValues, UseFormResetField, useController } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { useDateFormat } from '@/shared/hooks/useDateFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DatePicker, DatePickerProps } from '@/shared/ui/datePicker';

export type ControlledDatePickerProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
} & Omit<DatePickerProps, 'calendarError' | 'inputError' | 'onChange' | 'value'>;

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
  const [dateFormatError, setDateFormatError] = useState<string | undefined>(undefined);

  const handleChange = (
    date: DateObject | DateObject[] | null,
    { isTyping }: { isTyping: boolean }
  ) => {
    if (date === null && isTyping) {
      setDateFormatError(
        `Неверный формат даты. Введите дату в указанном формате: ${stringDateFormat}`
      );
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
    <DatePicker
      calendarError={dateFormatError}
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
