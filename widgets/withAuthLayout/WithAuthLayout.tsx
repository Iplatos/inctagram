import { PropsWithChildren, ReactElement } from 'react';

import { CommonLayout } from '@/widgets/Layout/Layout';
import { Sidebar } from '@/widgets/sidebar';
import { NextPage } from 'next';

import s from 'widgets/withAuthLayout/WithAuthLayout.module.scss';

export const WithAuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <>
      <CommonLayout>
        <Sidebar />
        <div className={s.contentWrapper}>{children}</div>
      </CommonLayout>
    </>
  );
};

export const getWithAuthLayout = (page: ReactElement) => {
  return <WithAuthLayout>{page}</WithAuthLayout>;
};
