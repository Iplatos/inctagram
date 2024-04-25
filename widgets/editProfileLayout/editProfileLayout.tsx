import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';
import Link from 'next/link';

import s from './EditProfileLayout.module.scss';

import { EditProfile } from '../accounts/edit/edit-profile';
import { Sidebar } from '../sidebar';
export const EditProfileLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Provider store={store}>
      <Header />
      <main>
        <NavBar />
        <Sidebar />
        <div className={s.EditProfileContainer}>
          <EditProfile />
          {children}
        </div>
      </main>
    </Provider>
  );
};
