import { useState } from 'react';
import { Control, FieldPath, FieldValues, UseFormResetField, useController } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { transformTaggedString } from '@/shared/helpers/transformTaggedString';
import { useDateFormat } from '@/shared/hooks/useDateFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { DatePicker, DatePickerProps } from '@/shared/ui/datePicker';
import { ZodType, z } from 'zod';

const checkInputPartsValue = (
  inputParts: string[],
  formatTokens: string[],
  date: DateObject | null
) => {
  const baseTokenSchema = z
    .string()
    .refine(s => s.match(/^\d+$/))
    .refine(s => !s.startsWith('00'));

  const tokenSchemaEnhancers: Record<string, ZodType<any, any, any>> = {
    DD: z.coerce.number().refine(v => (date ? v <= date.day : true)),
    MM: z.coerce.number().max(12),
    YYYY: z.coerce.number().min(1).max(9999),
  };

  return inputParts.every((part, i) => {
    const token = formatTokens[i];
    const enhancer = tokenSchemaEnhancers[token];

    if (enhancer) {
      return baseTokenSchema.pipe(enhancer).safeParse(part).success;
    }

    console.error(
      `No validation schema was found for the date part token: '${token}' in 'tokenSchemaEnhancers' object.\nUsed base token validation schema.`
    );

    return baseTokenSchema.safeParse(part).success;
  });
};

const checkInputPartsFormat = (inputParts: string[], requiredPartsCount: number) =>
  z.array(z.string().min(1)).length(requiredPartsCount).safeParse(inputParts).success;

const { interpolate } = transformTaggedString;

export type ProfileFormDatePickerProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
} & Omit<DatePickerProps, 'calendarError' | 'inputError' | 'onChange' | 'value'>;

export const ProfileFormDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  disabled,
  name,
  resetField,
  ...props
}: ProfileFormDatePickerProps<TFieldValues>) => {
  const {
    common: commonT,
    editProfile: { profileForm: t },
  } = useTranslation().t;

  const {
    field,
    fieldState: { error },
  } = useController({ control, disabled, name });

  const { stringDateFormat, tokensSeparator } = useDateFormat();
  const [calendarError, setCalendarError] = useState<string | undefined>(undefined);

  const dateFormatError = interpolate(t.dateOfBirth.errors.invalidDateFormat, {
    format: () => stringDateFormat,
  });

  const handleChange: DatePickerProps['onChange'] = (date, { input, isTyping }) => {
    if (Array.isArray(date)) {
      return;
    }
    // The user selects a date from the calendar and no cancellation or value validation is required
    if (!isTyping) {
      field.onChange(date instanceof DateObject ? date.toDate() : null);

      return;
    }

    const formatTokens = stringDateFormat.split(tokensSeparator);
    const splitInput = (input?.value ?? '').split(tokensSeparator);

    // The input value must conform to a locale-defined date format
    // In case of an error, use 'calendarError' mechanism.
    if (!checkInputPartsFormat(splitInput, formatTokens.length)) {
      setCalendarError(dateFormatError);
      field.onChange(null);

      return;
    }

    // If the input data is in the correct format, check each part of the date string
    if (!checkInputPartsValue(splitInput, formatTokens, date)) {
      // 'onChange' behavior when 'false' is returned:
      // https://shahabyazdi.github.io/react-multi-date-picker/validation/#validating-input-value
      return false;
    }

    setCalendarError(undefined);
    field.onChange(date instanceof DateObject ? date.toDate() : null);
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
      disabled={field.disabled}
      fixMainPosition
      format={stringDateFormat}
      inputError={error?.message}
      inputProps={{ disabled: field.disabled }}
      locale={commonT.datePicker.locale}
      onChange={handleChange}
      onClose={handleClose}
      value={field.value}
      {...props}
    />
  );
};
