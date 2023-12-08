import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { SideBar } from '@/shared/ui/sideBar';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
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