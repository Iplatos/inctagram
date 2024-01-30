import { ComponentPropsWithoutRef, FC } from 'react';
import DatePicker from 'react-multi-date-picker';

import { useDatePickerFormat } from '@/shared/hooks/useDatePickerFormat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography';
import { clsx } from 'clsx';
import Link from 'next/link';

/*import InputIcon from 'react-multi-date-picker/components/input_icon';*/
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from 'components/datePicker/datePicker.module.scss';

type DatePickerContainerProps = ComponentPropsWithoutRef<typeof DatePicker> & {
  error?: string;
  label?: string;
};

export const DatePickerContainer: FC<DatePickerContainerProps> = ({ error, label, ...props }) => {
  const { t } = useTranslation();
  const { localeFormat } = useDatePickerFormat();

  console.log(error);

  return (
    <div className={clsx(s.datePickerContainer, error && s.error)}>
      <Typography.Regular14 className={s.label} color={'var(--color-light-900)'}>
        {label}
      </Typography.Regular14>
      <DatePicker
        {...props}
        className={'bg-dark'}
        containerClassName={s.cont}
        dateSeparator={' - '}
        format={localeFormat}
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
        weekStartDayIndex={1}
      />
      {/*TODO: extract error message to the profile-form level*/}
      {error && (
        <Typography.SmallLink className={s.errorMessage}>
          {error}
        <Typography.Regular12 className={s.errorMessage}>
          <Link href={'/privacy-policy'} style={{ textDecoration: 'underLine' }}>
            {t.navbar.privacyPolicy}
          </Link>
        </Typography.Regular12>
      )}
    </div>
  );
};
