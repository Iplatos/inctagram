import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { MyProfile } from '@/pages/myProfile';
import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

import style from './Layout.module.scss';

import { Sidebar } from '../sidebar';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <Sidebar />
          <MyProfile />
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
