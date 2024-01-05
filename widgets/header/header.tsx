import { useGetMeQuery } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button';
import { ExpandBtn } from '@/widgets/header/ExpandBtn';
import { LangSwitcher } from '@/widgets/header/LangSwitcher';
import { NotificationMenu } from '@/widgets/header/NotificationMenu';
import { mockedNotifications } from '@/widgets/header/mockedData';
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
  const { data: meData } = useGetMeQuery();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={'/'}>Inctagram</Link>
        </div>
        <div className={styles.flex}>
          {meData ? (
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
          )}
        </div>
      </div>
    </header>
  );
};
