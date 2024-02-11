import { ComponentPropsWithoutRef, ElementRef, FC, useRef, useState } from 'react';
import ReactMultiDatePicker, { DateObject } from 'react-multi-date-picker';

import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import { clsx } from 'clsx';
import Link from 'next/link';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from './datePicker.module.scss';

import { DatePickerInput, FilteredDatePickerInputProps } from './slots/date-picker-input';

type RMDPProps = ComponentPropsWithoutRef<typeof ReactMultiDatePicker>;

type DatePickerChangeHandler = (
  date: DateObject | DateObject[] | null,
  options: {
    input: HTMLInputElement | null;
    isTyping: boolean;
    validatedValue: Array<string> | string;
  }
) => false | void;

export type DatePickerProps = Omit<RMDPProps, 'onChange'> & {
  calendarError?: string;
  inputError?: string;
  // input-related props contained in RMDPProps will not be applied to the internal Input element.
  // Instead, use inputProps
  inputProps?: FilteredDatePickerInputProps;
  label?: string;
  onChange?: DatePickerChangeHandler;
};

export const DatePicker: FC<DatePickerProps> = ({
  calendarError,
  children,
  inputError,
  inputProps,
  label,
  onChange,
  onClose,
  onOpen,
  onPositionChange,
  ...props
}) => {
  const [calendarErrorPos, setCalendarErrorPos] = useState<'bottom' | 'top'>('top');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const mapWeekends = ({ date }: { date: DateObject }) => {
    const isWeekend = [0, 6].includes(date.weekDay.index);

    return { className: isWeekend ? 'highlight highlight-red' : '' };
  };

  // A wrapper used to provide the consumer with a ref targeting a custom input element
  // https://shahabyazdi.github.io/react-multi-date-picker/validation/#validating-input-value
  const handleChange: RMDPProps['onChange'] = (date, { input, ...options }) => {
    return onChange?.(date, { ...options, input: inputRef.current });
  };

  const handleOpen = () => {
    setIsOpen(true);

    return onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);

    return onClose?.();
  };

  const handlePositionChange: DatePickerProps['onPositionChange'] = data => {
    const newPos = data.popper.top < data.element.top ? 'bottom' : 'top';

    if (newPos !== calendarErrorPos) {
      setCalendarErrorPos(newPos);
    }
    onPositionChange?.(data);
  };

  const isAnyError = !!(calendarError || inputError);

  return (
    <div className={clsx(s.datePickerContainer, isAnyError && s.error)}>
      <Typography.Regular14 className={s.label} color={'var(--color-light-900)'}>
        {label}
      </Typography.Regular14>
      <ReactMultiDatePicker
        arrow={false}
        className={'bg-dark'}
        containerClassName={s.cont}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        mapDays={mapWeekends}
        monthYearSeparator={' '}
        onChange={handleChange}
        onClose={handleClose}
        onOpen={handleOpen}
        onPositionChange={handlePositionChange}
        render={
          <DatePickerInput
            date={props.value}
            error={isAnyError}
            format={props.format}
            open={isOpen}
            ref={inputRef}
            {...inputProps}
          />
        }
        shadow={false}
        weekStartDayIndex={1}
        zIndex={1200}
        {...props}
      >
        {children}
        {calendarError && (
          <Typography.Regular12
            className={clsx(s.formatError, s.errorMessage)}
            component={'p'}
            style={{ ...(calendarErrorPos === 'top' && { order: -1 }) }}
          >
            {calendarError}
          </Typography.Regular12>
        )}
      </ReactMultiDatePicker>

      {inputError && (
        <Typography.Regular12 className={s.errorMessage}>
          <Trans
            tags={{
              link: ({ content }) => (
                <Link href={'/privacy-policy'} style={{ textDecoration: 'underLine' }}>
                  {content}
                </Link>
              ),
            }}
            text={inputError}
          />
        </Typography.Regular12>
      )}
    </div>
  );
};
