import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import Edit from '@/pages/settings';
import { store } from '@/shared/api/store';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

import style from './BaseLayout.module.scss';

import { Sidebar } from '../sidebar';
import { Layout } from './Layout';

export const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Layout>
      <Sidebar />
      {children}
    </Layout>
  );
};

export function getBaseLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}
