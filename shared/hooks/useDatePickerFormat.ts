import { useRouter } from 'next/router';

import { en } from '../../locales/en';

// TODO: watch to `i18n library;
export const useDatePickerFormat = () => {
  const router = useRouter();

  const localeFormat = router.locale === 'en' ? 'MM/DD/YYYY' : 'DD.MM.YYYY';

  return { localeFormat };
};
