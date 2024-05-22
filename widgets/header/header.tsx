import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
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
    <div className={styles.container}>
      <header className={styles.content}>
        <Typography.Large component={Link} href={'/'}>
          Inctagram
        </Typography.Large>
        <div className={styles.controlsWrapper}>
          <LangSwitcher />
          <div className={styles.buttonsWrapper}>
            <Button as={'span'} variant={'text'}>
              <Link href={'/sign-in'}>{t.navbar.signIn}</Link>
            </Button>
            <Button as={'span'}>
              <Link href={'/sign-up'}>{t.navbar.signUp}</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};
