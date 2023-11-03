import FlagRu from '@/assets/icons/flag-ru.svg';
import FlagEn from '@/assets/icons/flag-uk.svg';
import { SelectBox } from '@/shared/ui/SelectBox';

import styles from './Header.module.scss';

import { NotificationBtn } from './NotificationBtn';

const selectOptions = [
  { image: FlagEn, label: 'text111', value: '1111' },
  { image: FlagRu, label: 'text222', value: '2222' },
  { label: 'text333', value: '3333' },
];

export const Header = () => {
  const isLoggedIn = true;
  const notifications = 3;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Inctagram</div>
      <div className={styles.flex}>
        {isLoggedIn ? (
          <>
            <NotificationBtn notifications={notifications} />
            <SelectBox options={selectOptions} width={'small'} />
          </>
        ) : (
          <>
            <SelectBox />
            <div className={styles['buttons-wrapper']}>
              <button>Log in</button>
              <button>Sign up</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
