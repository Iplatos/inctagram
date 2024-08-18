import { useRouter } from 'next/router';

type Locale = 'en' | 'ru';
type Replacements = Record<string, string>;

const replacementsMap: Record<Locale, Replacements> = {
  en: {
    minute: 'min',
    minutes: 'min',
    month: 'mo',
    months: 'mo',
    second: 'sec',
    seconds: 'sec',
  },
  ru: {
    месяц: 'мес.',
    месяцев: 'мес.',
    минут: 'мин.',
    минуты: 'мин.',
    недели: 'нед.',
    неделя: 'нед.',
    секунд: 'сек.',
    секунда: 'сек.',
    секунды: 'сек.',
  },
};

const getTimeDifference = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { unit: 'year', value: 60 * 60 * 24 * 365 },
    { unit: 'month', value: 60 * 60 * 24 * 30 },
    { unit: 'day', value: 60 * 60 * 24 },
    { unit: 'hour', value: 60 * 60 },
    { unit: 'minute', value: 60 },
    { unit: 'second', value: 1 },
  ];

  for (const { unit, value } of intervals) {
    const diff = Math.floor(seconds / value);

    if (diff > 0) {
      return { unit, value: diff };
    }
  }

  return { unit: 'second', value: 0 }; // В случае, если разница меньше секунды
};

const getShortRelativeTime = (date: Date, locale: Locale): string => {
  const { unit, value } = getTimeDifference(date);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' });
  const formattedTime = formatter.format(-value, unit as Intl.RelativeTimeFormatUnit);

  const replacements = replacementsMap[locale];
  const shortFormatted = formattedTime
    .split(' ')
    .map(word => replacements[word] || word)
    .join(' ');

  return locale === 'ru' ? `${shortFormatted}` : shortFormatted;
};

const useRelativeTime = (date: string): string => {
  const { locale } = useRouter();
  const effectiveLocale = locale === 'ru' || locale === 'en' ? locale : 'en';

  return getShortRelativeTime(new Date(date), effectiveLocale);
};

export default useRelativeTime;
