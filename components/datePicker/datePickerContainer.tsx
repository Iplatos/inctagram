import { ComponentPropsWithoutRef, FC, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';

import { useDatePickerFormat } from '@/shared/hooks/useDatePickerFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography';
import { clsx } from 'clsx';
import Link from 'next/link';
import InputIcon from 'react-multi-date-picker/components/input_icon';

/*import InputIcon from 'react-multi-date-picker/components/input_icon';*/
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from 'components/datePicker/datePicker.module.scss';

export type DatePickerContainerProps = ComponentPropsWithoutRef<typeof DatePicker> & {
  calendarError?: string;
  inputError?: string;
  label?: string;
};

export const DatePickerContainer: FC<DatePickerContainerProps> = ({
  calendarError,
  children,
  inputError,
  label,
  onPositionChange,
  ...props
}) => {
  const { t } = useTranslation();
  const [calendarErrorPos, setCalendarErrorPos] = useState<'bottom' | 'top'>('top');

  const mapWeekends = ({ date }: { date: DateObject }) => {
    const isWeekend = [0, 6].includes(date.weekDay.index);

    return { className: isWeekend ? 'highlight highlight-red' : '' };
  };

  const handlePositionChange: DatePickerContainerProps['onPositionChange'] = data => {
    const newPos = data.popper.top < data.element.top ? 'bottom' : 'top';

    if (newPos !== calendarErrorPos) {
      setCalendarErrorPos(newPos);
    }
    onPositionChange?.(data);
  };

  const isAnyError = calendarError || inputError;

  return (
    <div className={clsx(s.datePickerContainer, isAnyError && s.error)}>
      <Typography.Regular14 className={s.label} color={'var(--color-light-900)'}>
        {label}
      </Typography.Regular14>
      <DatePicker
        {...props}
        className={'bg-dark'}
        containerClassName={s.cont}
        dateSeparator={' - '}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        locale={t.datePicker.locale}
        mapDays={({ date }) => {
          const props = { className: '' };
          const isWeekend = [0, 6].includes(date.weekDay.index);

          if (isWeekend) {
            props.className = 'highlight highlight-red';
          }

          return props;
        }}
        mapDays={mapWeekends}
        onPositionChange={handlePositionChange}
        render={<InputIcon />}
        weekStartDayIndex={1}
      />
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
      </DatePicker>

      {/*TODO: extract error message to the profile-form level*/}
      {inputError && (
        <Typography.Regular12 className={s.errorMessage}>
          {inputError}
          <Link href={'/privacy-policy'} style={{ textDecoration: 'underLine' }}>
            {t.navbar.privacyPolicy}
          </Link>
        </Typography.Regular12>
      )}
    </div>
  );
};
