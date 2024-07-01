import { useEffect, useState } from 'react';

import { formatDistanceToNowStrict } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useRouter } from 'next/router';

const localeMap = {
  en: enUS,
  ru,
};

type Locale = 'en' | 'ru';

type Replacements = {
  [key: string]: string;
};

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
    года: 'г',
    дней: 'д',
    дня: 'д',
    лет: 'г',
    месяц: 'мес',
    месяцев: 'мес',
    минут: 'мин',
    минуты: 'мин',
    недели: 'нед',
    неделя: 'нед',
    секунд: 'сек',
    секунда: 'сек',
    секунды: 'сек',
    часа: 'ч',
    часов: 'ч',
  },
};

const getShortRelativeTime = (date: Date, locale: Locale): string => {
  const distance = formatDistanceToNowStrict(date, { locale: localeMap[locale] });
  const replacements = replacementsMap[locale];

  const shortDistance = distance
    .split(' ')
    .map(word => replacements[word] || word)
    .join(' ');

  return locale === 'ru' ? `${shortDistance} назад` : `${shortDistance} ago`;
};

const useRelativeTime = (date: string): string => {
  const { locale } = useRouter();
  const effectiveLocale = locale === 'ru' || locale === 'en' ? locale : 'en';
  const [relativeTime, setRelativeTime] = useState<string>(
    getShortRelativeTime(new Date(date), effectiveLocale)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(getShortRelativeTime(new Date(date), locale as 'en' | 'ru'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date, locale]);

  return relativeTime;
};

export default useRelativeTime;
