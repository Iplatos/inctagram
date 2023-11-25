import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { Header } from '@/components/Header';
import { NavBar } from '@/components/NavBar/NavBar';
import { store } from '@/pages/api/store';
import { SideBar } from '@/shared/ui/sideBar';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <SideBar />
          <NavBar />
          <SideBar />
          {children}
        </main>
      </Provider>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
