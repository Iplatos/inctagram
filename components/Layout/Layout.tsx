import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';

// import styles from '@/styles/Home.module.css';

import { Header } from '../Header/Header';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
