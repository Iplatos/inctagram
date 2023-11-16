import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { Header } from '@/components/Header';
import { NavBar } from '@/components/NavBar/NavBar';
import { SignUp } from '@/components/auth/sign-up-form';
import { store } from '@/pages/api/store';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <NavBar />
          {children}
          <SignUp />
        </main>
      </Provider>
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
