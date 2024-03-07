import { PropsWithChildren, ReactElement } from 'react';

import { Layout } from '@/widgets/Layout/Layout';
import { Sidebar } from '@/widgets/sidebar';
import { NextPage } from 'next';

export const WithAuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <Layout>
        <Sidebar />
        {children}
      </Layout>
    </>
  );
};

export const getWithAuthLayout = (page: ReactElement) => {
  return <WithAuthLayout>{page}</WithAuthLayout>;
};
