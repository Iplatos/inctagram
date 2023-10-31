import { PropsWithChildren, ReactElement } from 'react';

import { Header } from '@/components/Header/Header';
import { NavBar } from '@/components/NavBar/NavBar';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <main>
      <Header />

      <NavBar />

      {children}
    </main>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
