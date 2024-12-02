import { useDateFormat } from '@/shared/hooks';
import { PropsWithoutChildren } from '@/shared/types/helpers';
import { Typography, TypographyProps } from '@/shared/ui/typography';
import clsx from 'clsx';

import s from './time.module.scss';

export type TimeProps = {
  date: Date | number | string;
  dateTime?: string;
  options?: Intl.DateTimeFormatOptions;
  typographyProps?: PropsWithoutChildren<TypographyProps<'time'>>;
};

export const Time = ({ date: time, dateTime, options, typographyProps = {} }: TimeProps) => {
  const { className, ...restTypographyProps } = typographyProps;
  const formattedDate = useDateFormat(new Date(time), options, parts =>
    parts.map(({ value }) => value).join('')
  );

  return (
    <Typography.SmallText
      className={clsx(className, s.root)}
      component={'time'}
      dateTime={dateTime}
      {...restTypographyProps}
    >
      {formattedDate}
    </Typography.SmallText>
  );
};
