import { ComponentPropsWithoutRef, FC } from 'react';
import DatePicker from 'react-multi-date-picker';

import en_th from '@/components/datePicker/en_th';
import ru_th from '@/components/datePicker/ru_th';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputIcon from 'react-multi-date-picker/components/input_icon';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from 'components/datePicker/datePicker.module.scss';

type DatePickerContainerProps = ComponentPropsWithoutRef<typeof DatePicker> & {
  error?: string;
  label?: string;
};

export const DatePickerContainer: FC<DatePickerContainerProps> = ({ error, label, ...props }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // TODO: Move locale setting in global file
  const getLocale = () => {
    return router.locale && router.locale === 'en' ? en_th : ru_th;
  };

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
        format={router.locale === 'en' ? 'DD/MM/YYYY' : 'MM.DD.YYYY'}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        locale={getLocale()}
        mapDays={({ date }) => {
          const props = { className: '' };
          const isWeekend = [0, 6].includes(date.weekDay.index);

          if (isWeekend) {
            props.className = 'highlight highlight-red';
          }

          return props;
        }}
        render={<InputIcon />}
        weekStartDayIndex={1}
      />
      {/*TODO: extract error message to the profile-form level*/}
      {error && (
        <div className={s.errorMessage}>
          A user under 13 cannot create a profile.{' '}
          <Link href={'/privacy-policy'} style={{ textDecoration: 'underLine' }}>
            {t.navbar.privacyPolicy}
          </Link>
        </div>
      )}
    </div>
  );
};
