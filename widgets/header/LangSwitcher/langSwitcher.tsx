import FlagRu from '@/assets/icons/flag-ru.svg?url';
import FlagEn from '@/assets/icons/flag-uk.svg?url';
import { SelectBox } from '@/shared/ui/SelectBox';
import { useRouter } from 'next/router';

/** Each value in selectOptions you provide should match locales in next.config.js */
const selectOptions = [
  { image: FlagEn, label: 'English', value: 'en' },
  { image: FlagRu, label: 'Русский', value: 'ru' },
];

export const LangSwitcher = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter();
  const defaultIdx = selectOptions.findIndex(option => option.value === locale);

  const changeLangHandler = (value: string) => {
    // push({ pathname, query }, asPath, { locale: value });
    push(value);
  };

  return (
    <div style={{ width: '163px' }}>
      <SelectBox defaultValue={defaultIdx} onChangeFn={changeLangHandler} options={selectOptions} />
    </div>
  );
};
