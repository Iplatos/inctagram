import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { NavBar } from '@/components/NavBar/NavBar';
import { SignInForm } from '@/components/auth/sign-in-form';
import { store } from '@/pages/api/store';
import { SignUp } from '@/pages/signUp';
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
