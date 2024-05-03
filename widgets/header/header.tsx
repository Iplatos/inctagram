import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button';
import { LangSwitcher } from '@/widgets/header/LangSwitcher';
import Link from 'next/link';

import styles from './header.module.scss';

export type Notification = {
  id: string;
  isNew?: boolean;
  message: string;
  notificationTime: string;
};

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={'/'}>Inctagram</Link>
        </div>
        <div className={styles.flex}>
          {/*{meData ? (
            <>
              <NotificationMenu notifications={mockedNotifications} />
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
          )}*/}
          <LangSwitcher />
          <div className={styles['buttons-wrapper']}>
            <Button variant={'text'}>
              <Link href={'/sign-in'}>{t.navbar.signIn}</Link>
            </Button>
            <Button>
              <Link href={'/sign-up'}>{t.navbar.signUp}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
