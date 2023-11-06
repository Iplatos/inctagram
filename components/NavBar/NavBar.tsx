import Link from 'next/link';
import styles from './NavBar.module.scss';

import { useTranslation } from '@/shared/hooks/useTranslation';

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.linksContainer}>
      <div className={styles.links}>
        <Link href={'/'}>{t.navbar.main}</Link>
        <Link href={'/signIn'}>{t.navbar.signIn}</Link>
        <Link href={'/signUp'}>{t.navbar.signUp}</Link>
        <Link href={'/forgotPassword'}>{t.navbar.forgotPassword}</Link>
        <Link href={'/termsOfService'}>{t.navbar.termsOfService}</Link>
        <Link href={'/privacyPolicy'}>{t.navbar.privacyPolicy}</Link>
        <Link href={'/confirm-registration'}>Confirm Registration</Link>
      </div>
    </div>
  );
};
