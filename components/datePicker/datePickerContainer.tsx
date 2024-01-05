// eslint-disable-next-line no-duplicate-imports
import { useState } from 'react';
import DatePicker, { DateObject, Value } from 'react-multi-date-picker';

import en_th from '@/components/datePicker/en_th';
import ru_th from '@/components/datePicker/ru_th';
import { en } from '@/locales/en';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputIcon from 'react-multi-date-picker/components/input_icon';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from 'components/datePicker/datePicker.module.scss';

export const DatePickerContainer = () => {
  const [values, setValues] = useState<Value | null>(
    null
    /*    new DateObject(new Date().getTime() - 4 * 24 * 60 * 60 * 1000)*/
  );
  const { t } = useTranslation();
  const router = useRouter();

  const isValidData = () => {
    if (values) {
      const differenceInSeconds = Math.abs(new Date().getTime() - +values) / 1000;
      const differenceInYears = differenceInSeconds / (365 * 24 * 3600);

      return differenceInYears.toFixed(2);
    }
  };

  /*  if (values) {
      const differenceInSeconds = Math.abs(new Date().getTime() - +values[0]) / 1000;
      const differenceInYears = differenceInSeconds / (365 * 24 * 3600);
  
      console.log(
        `Разница между текущей датой и первой датой составляет приблизительно ${differenceInYears.toFixed(
          2
        )} лет`
      );
    }*/
  const changeLocale = () => {
    return router.locale && router.locale === 'en' ? en_th : ru_th;
  };
  const handleDateChange = (
    date: DateObject | DateObject[] | null,
    options: { input: HTMLElement; isTyping: boolean; validatedValue: string | string[] }
  ): void => {
    isValidData();
    setValues(date);
  };

  /*  if (values) {
      console.log((new Date() - values[0]?.toDate()) / (1000 * 60 * 60 * 24 * 365.25));
    }*/

  return (
    <div
      className={
        isValidData() > 13 || !isValidData()
          ? `${s.datePickerContainer}`
          : `${s.datePickerContainer} ${s.error}`
      }
      /*  onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}*/
    >
      <div>
        <Typography.Regular14 color={'var(--color-light-900)'}>
          {t.datePicker.DataSelect}
        </Typography.Regular14>
      </div>
      <DatePicker
        className={'bg-dark'}
        containerClassName={s.cont}
        dateSeparator={' - '}
        format={'DD.MM.YYYY'}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        locale={changeLocale()}
        mapDays={({ date }) => {
          const props = { className: '' };
          const isWeekend = [0, 6].includes(date.weekDay.index);

          if (isWeekend) {
            props.className = 'highlight highlight-red';
          }

          return props;
        }}
        onChange={handleDateChange}
        /* range*/
        render={<InputIcon />}
        value={values}
        weekStartDayIndex={1}
      />
      {/*{open && <Calendar className={s.calendar} />}*/}
      {isValidData() < 13 && (
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
