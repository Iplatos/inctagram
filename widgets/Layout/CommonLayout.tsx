import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';
import Link from 'next/link';

import { EditProfile } from '../accounts/edit/edit-profile';
import { Sidebar } from '../sidebar';

export const CommonLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Provider store={store}>
      <Header />
      <main>
        <NavBar />
        <Sidebar />
        <div style={{ marginLeft: '0px' }}>
          <EditProfile />
          {children}
        </div>
      </main>
    </Provider>
  );
};
