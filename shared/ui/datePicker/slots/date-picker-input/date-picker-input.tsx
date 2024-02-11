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
  format?: string | undefined;
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
      onChange,
      onFocus,
      open,
      openCalendar, // unused RMDP-specific prop
      separator,
      value,
      ...props
    },
    ref
  ) => {
    /*Fix 'wrong source of truth' error when DatePicker is used in a controlled manner:

      If the user enters an invalid value into an input element,
      the DatePicker's 'onChange' handler gets 'null' as the date value.
      In this case, the input value will be set to an empty string after the calendar is closed,
      even if the DatePicker was passed a valid value prop.
      This error persists even if the DatePicker 'onChange' handler returns 'false'
      to prevent the DatePicker from changing its internal state.*/
    let resolvedInputValue = value;

    if (!value && date) {
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
        onChange={onChange}
        onFocus={onFocus}
        ref={ref}
        value={resolvedInputValue}
        {...props}
      />
    );
  }
);
