import { PropsWithChildren, ReactElement } from 'react';

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
