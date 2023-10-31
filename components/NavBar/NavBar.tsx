import Link from 'next/link';

import styles from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={styles.linksContainer}>
      <div className={styles.links}>
        <Link href={'/'}>Main</Link>
        <Link href={'/signIn'}>Sign In</Link>
        <Link href={'/signUp'}>Sign Up</Link>
        <Link href={'/forgotPassword'}>Forgot Password</Link>
        <Link href={'/termsOfService'}>Terms Of Service</Link>
        <Link href={'/privacyPolicy'}>Privacy Policy</Link>
        <Link href={'/confirm-registration'}>Confirm Registration</Link>
      </div>
    </div>
  );
};
