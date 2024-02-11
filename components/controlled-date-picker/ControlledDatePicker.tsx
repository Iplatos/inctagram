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
    field,
    fieldState: { error },
  } = useController({ control, disabled, name });

  const { stringDateFormat, tokensSeparator } = useDateFormat();
  const [calendarError, setCalendarError] = useState<string | undefined>(undefined);

  const dateFormatError = interpolate(t.dateOfBirth.errors.invalidDateFormat, {
    format: () => stringDateFormat,
  });

  /*DatePicker has a built-in date parsing and validation mechanism.
    If with a valid 'date' parameter (date !== null) we try to exit the 'onChange' handler early,
    preventing the DatePicker's internal/global state from changing, the date in the input will change anyway,
    even though the state remains unchanged.
    That's why I correct the value of the input only in cases where there is no discrepancy
    between the value of the input and the DatePicker state.
    In other cases I use the 'dateFormatError' approach.*/
  const handleChange: DatePickerProps['onChange'] = (date, { input, isTyping }) => {
    // The user selects a date from the calendar and no cancellation or value validation is required
    if (!isTyping) {
      field.onChange(date instanceof DateObject ? date.toDate() : null);

      return;
    }

    const tokens = (input?.value ?? '').split(tokensSeparator);

    // Cancel user input data if necessary and exit
    if (inputValueShouldBeCanceled(tokens)) {
      return false;
    }

    const isDateFormatError = checkDateFormatError(tokens);

    if (isDateFormatError) {
      setCalendarError(dateFormatError);
      field.onChange(null);

      return;
    }

    setCalendarError(undefined);
    field.onChange(date instanceof DateObject ? date.toDate() : null);

    function inputValueShouldBeCanceled(dateTokens: string[]) {
      if (dateTokens.some(val => val.startsWith('00'))) {
        return true;
      }

      return dateTokens.map(Number).some(num => num < 0);
    }

    function checkDateFormatError(dateTokens: string[]) {
      if (dateTokens.length !== 3) {
        return true;
      }

      return dateTokens.map(t => (t.length ? Number(t) : NaN)).some(isNaN);
    }
  };

  const handleClose = () => {
    if (calendarError) {
      setCalendarError(undefined);
      resetField(name);
    }
    field.onBlur();
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
      value={field.value}
      {...props}
    />
  );
};
