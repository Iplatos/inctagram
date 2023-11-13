import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';

import styles from './header.module.scss';

import { ExpandBtn } from './ExpandBtn';
import { LangSwitcher } from './LangSwitcher';
import { NotificationMenu } from './NotificationMenu';

export type Notification = {
  id: string;
  isNew?: boolean;
  message: string;
  notificationTime: string;
};

const mockedNotifications: Notification[] = [
  {
    id: '0',
    isNew: true,
    message: 'Следующий платеж у вас спишется через 1 день',
    notificationTime: '1 час',
  },
  {
    id: '1',
    isNew: true,
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '2',
    isNew: true,
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '3',
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '4',
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
];

export const Header = () => {
  const { t } = useTranslation();
  const isLoggedIn = true;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Inctagram</div>
        <div className={styles.flex}>
          {isLoggedIn ? (
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
