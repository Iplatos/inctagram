import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';

import { Header } from '../Header';
import { NavBar } from '../NavBar/NavBar';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>
        <NavBar />
        {children}
      </main>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
