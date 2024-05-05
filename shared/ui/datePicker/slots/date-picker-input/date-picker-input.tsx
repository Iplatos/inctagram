import { ElementRef, forwardRef } from 'react';
import {
  DateObject,
  CustomComponentProps as RMDPCustomInputProps,
  Value as RMDPValue,
} from 'react-multi-date-picker';

import { CalendarFilled } from '@/assets/icons/calendar-filled';
import { CalendarOutlined } from '@/assets/icons/calendar-outlined';
import { Input, InputProps } from '@/shared/ui/input';
import { InputAdornment } from '@/shared/ui/input-adornment';

type OwnProps = RMDPCustomInputProps & {
  date?: RMDPValue;
  format?: string;
  omitInputChange: boolean;
  open: boolean;
};

export type FilteredDatePickerInputProps = Omit<
  InputProps,
  'onValueChange' | 'type' | keyof OwnProps
>;
export type DatePickerInputProps = FilteredDatePickerInputProps & OwnProps;

export const DatePickerInput = forwardRef<ElementRef<'input'>, DatePickerInputProps>(
  (
    {
      date,
      error,
      format,
      handleValueChange, // unused RMDP-specific prop
      locale, // unused RMDP-specific prop
      omitInputChange,
      onFocus,
      open,
      openCalendar, // unused RMDP-specific prop
      separator,
      value,
      ...props
    },
    ref
  ) => {
    /* After the DatePicker's 'onClose' event, the value of the input always depends on whether the DatePicker was able to parse correctly:
      when manually entering a date via input, it can be an empty string if it fails, or a new date string if it succeeds.
      The value of the input is always changed based on the parsing of the entered string, regardless of the internal state of the DatePicker or the external state of the parent component.
      To get around this behavior, in 'controlled-text-field mode' (where the date is explicitly passed to the DatePicker):
        * if the DatePicker's 'onChange' handler returns 'false',
        * or the parsing of the input failed (an empty string was passed),
      the input value will be taken from the provided date.

      IMPORTANT: the DatePicker's 'onChange' handler should not change the external state if the input value has not pass validation. */
    let resolvedInputValue = value;

    const isEmptyValue = (Array.isArray(value) && !value[0].length) || !value;
    const shouldOmitInputValue = omitInputChange || isEmptyValue;

    if (date && shouldOmitInputValue) {
      if (Array.isArray(date)) {
        resolvedInputValue = date.join(separator);
      } else if (date instanceof DateObject) {
        resolvedInputValue = date.format(format);
      } else {
        resolvedInputValue = new DateObject(date).format(format);
      }
    }

    return (
      <Input
        endAdornment={
          <InputAdornment position={'end'}>
            <button onClick={() => onFocus?.()} type={'button'}>
              {open ? <CalendarFilled /> : <CalendarOutlined />}
            </button>
          </InputAdornment>
        }
        error={error}
        onFocus={onFocus}
        ref={ref}
        value={resolvedInputValue}
        {...props}
      />
    );
  }
);
