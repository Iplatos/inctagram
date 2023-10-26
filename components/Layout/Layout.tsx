import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';

import styles from './Home.module.scss';

import { Header } from '../Header/Header';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
