import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '@/components/NavBar/NavBar';
import { Header } from '@/components/header/header';
import { store } from '@/pages/api/store';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <main>
      <Header />
      <Provider store={store}>
        <NavBar />
        {children}
      </Provider>
    </main>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
