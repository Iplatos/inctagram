import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '@/components/NavBar/NavBar';
import { store } from '@/pages/api/store';
import { NextPage } from 'next';

import { Header } from '../Header';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <NavBar />
          {children}
        </main>
      </Provider>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
