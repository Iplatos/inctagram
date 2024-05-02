import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

import { CommonLayout } from '../Layout/CommonLayout';

export const AuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <CommonLayout>
      <main>
        <NavBar />
        {children}
      </main>
    </CommonLayout>
  );
};
