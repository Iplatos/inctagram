import { useRouter } from 'next/router';

type DateFormatter = (parts: Intl.DateTimeFormatPart[]) => any;
type DefaultDateFormatter = (parts: Intl.DateTimeFormatPart[]) => {
  stringDateFormat: string;
  tokensSeparator: string;
};

export const useDateFormat = <T extends DateFormatter = DefaultDateFormatter>(
  options?: Intl.DateTimeFormatOptions,
  formatter?: T
): ReturnType<T> => {
  options ??= { day: '2-digit', month: '2-digit', year: 'numeric' };
  const { locale } = useRouter();
  const partsArray = new Intl.DateTimeFormat(locale, options).formatToParts(new Date());

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
