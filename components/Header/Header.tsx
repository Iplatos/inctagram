import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import Link from 'next/link';

import styles from './Header.module.scss';

import { ExpandBtn } from './ExpandBtn';
import { LangSwitcher } from './LangSwitcher';
import { NotificationBtn } from './NotificationBtn';

export const Header = () => {
  const { t } = useTranslation();
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
              <ExpandBtn />
            </>
          ) : (
            <>
              <LangSwitcher />
              <div className={styles['buttons-wrapper']}>
                <Button variant={'text'}>
                  <Link href={'/signIn'}>{t.navbar.signIn}</Link>
                </Button>
                <Button>
                  <Link href={'/signUp'}>{t.navbar.signUp}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
