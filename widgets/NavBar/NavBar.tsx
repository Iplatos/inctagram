import { useState } from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import Link from 'next/link';

import styles from './NavBar.module.scss';

export const NavBar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.linksContainer}>
      <button className={styles.showNavBarButton} onClick={() => setOpen(!open)}>
        Nav
      </button>
      {open && (
        <div className={styles.links}>
          <Link href={'/'}>{t.navbar.main}</Link>
          <Link href={'/signIn'}>{t.navbar.signIn}</Link>
          <Link href={'/signUp'}>{t.navbar.signUp}</Link>
          <Link href={'/forgot-password'}>{t.navbar.forgotPassword}</Link>
          <Link href={'/create-new-password'}>Восстановление пароля</Link>
          <Link href={'/terms-of-service'}>{t.navbar.termsOfService}</Link>
          <Link href={'/privacy-policy'}>{t.navbar.privacyPolicy}</Link>
          <Link href={'/confirm-registration'}>Confirm Registration</Link>
        </div>
      )}
    </div>
  );
};
