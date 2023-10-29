import { PropsWithChildren, ReactElement } from 'react';

import { NavBar } from '@/components/NavBar/NavBar';
import { NextPage } from 'next';

import styles from 'components/Layout/Home.module.scss';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <main className={styles.main}>
      <NavBar />
      {children}
    </main>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
