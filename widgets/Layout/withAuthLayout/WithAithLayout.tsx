import { PropsWithChildren, ReactElement } from 'react';

import { Layout } from '@/widgets/Layout/Layout';
import { Sidebar } from '@/widgets/sidebar';
import { NextPage } from 'next';

import s from './WithAuthLayout.module.scss';

export const WithAuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Layout>
        <Sidebar />
        <div className={s.WithAuthLayout}>{children}</div>
      </Layout>
    </>
  );
};

export const getWithAuthLayout = (page: ReactElement) => {
  return <WithAuthLayout>{page}</WithAuthLayout>;
};
