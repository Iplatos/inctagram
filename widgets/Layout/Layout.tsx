import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '@/components/NavBar/NavBar';
import { Header } from '@/components/header';
import { store } from '@/shared/api/store';
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
          {children}
        </main>
      </Provider>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
