import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui/typography';
import InputIcon from 'react-multi-date-picker/components/input_icon';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from 'components/datePicker/datePicker.module.scss';

export const DatePickerContainer = () => {
  const [values, setValues] = useState([
    new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000), // Subtract 4 days
    new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
  ]);
  const { t } = useTranslation();

  console.log(t);

  return (
    <div className={s.datePickerContainer}>
      <div>
        <Typography.Regular14 color={'var(--color-light-900)'}>
          {t.datePicker.DataSelect}
        </Typography.Regular14>
      </div>
      <DatePicker
        className={'bg-dark'}
        containerClassName={s.cont}
        dateSeparator={' - '}
        format={'DD/MM/YYYY'}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        /*locale={ru_th}*/
        mapDays={({ date }) => {
          const props = {};
          const isWeekend = [0, 6].includes(date.weekDay.index);

          if (isWeekend) {
            props.className = 'highlight highlight-red';
          }

          return props;
        }}
        onChange={setValues}
        range
        render={<InputIcon />}
        value={values}
      />
    </div>
  );
};
