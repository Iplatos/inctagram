import styles from './Header.module.scss';

import { LangSwitcher } from './LangSwitcher';
import { NotificationBtn } from './NotificationBtn';

export const Header = () => {
  const isLoggedIn = true;
  const notifications = 3;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Inctagram</div>
        <div className={styles.flex}>
          {isLoggedIn ? (
            <>
              <NotificationBtn notifications={notifications} />
              <LangSwitcher />
            </>
          ) : (
            <>
              <LangSwitcher />
              <div className={styles['buttons-wrapper']}>
                <button>Log in</button>
                <button>Sign up</button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
