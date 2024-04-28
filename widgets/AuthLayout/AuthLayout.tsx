import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

export const AuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Provider store={store}>
      <Header />
      <main>
        <NavBar />
        {children}
      </main>
    </Provider>
  );
};
