import styles from './Header.module.scss';

export const Header = () => {
  const isLoggedIn = true;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Inctagram</div>
    </header>
  );
};
