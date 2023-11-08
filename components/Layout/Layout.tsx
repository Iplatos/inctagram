import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { Header } from '@/components/Header/Header';
import { NavBar } from '@/components/NavBar/NavBar';
import { store } from '@/pages/api/store';
import { SideBar } from '@/shared/ui/sideBar/sidebar';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>
        <SideBar />
        <Provider store={store}>
          <NavBar />
          {children}
        </Provider>
      </main>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
