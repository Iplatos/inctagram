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
    /* RMDP documentation says that if the DatePicker's 'onChange' handler returns 'false',
      its internal state will not be changed.
      But despite this, the input value is always changed, regardless of the DatePicker's internal state.
      To get around this behavior, in 'controlled mode' (when the date is explicitly passed to DatePicker),
      if DatePicker 'onChange' handler returns 'false' then the value of the input will be taken from the provided date.

      IMPORTANT: the DatePicker's 'onChange' handler should not change the external state if the input value has not pass validation. */
    let resolvedInputValue = value;

    if (date && omitInputChange) {
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
