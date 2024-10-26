import { useRouter } from 'next/router';

export type DateFormatter = (parts: Intl.DateTimeFormatPart[]) => any;
type DefaultDateFormatter = (parts: Intl.DateTimeFormatPart[]) => {
  stringDateFormat: string;
  tokensSeparator: string;
};

export const useDateFormat = <T extends DateFormatter = DefaultDateFormatter>(
  date?: Date,
  options?: Intl.DateTimeFormatOptions,
  formatter?: T
): ReturnType<T> => {
  const { locale } = useRouter();
  const partsArray = new Intl.DateTimeFormat(locale, options).formatToParts(date ?? new Date());

  return (formatter ?? defaultFormatter)(partsArray);
};

const defaultFormatter: DefaultDateFormatter = parts => {
  let tokensSeparator = '';
  const stringDateFormat = parts
    .map(({ type, value }) => {
      switch (type) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MM';
        case 'year':
          return 'YYYY';
        default:
          return (tokensSeparator = value);
      }
    })
    .join('');

  return { stringDateFormat, tokensSeparator };
};
