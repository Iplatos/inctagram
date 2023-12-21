import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

import { Sidebar } from '../sidebar';

import style from './Layout.module.scss';
import { Content } from '@radix-ui/react-select';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <Header />

        <main>
          <Sidebar />
          {/* <NavBar /> */}
        </main>
      </Provider>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
