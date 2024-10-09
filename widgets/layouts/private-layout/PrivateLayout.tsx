import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';
import { Sidebar } from 'widgets/layouts/private-layout/sidebar';

import s from './private-layout.module.scss';

import { PrivateHeader } from './private-header/PrivateHeader';

export const PrivateLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PrivateHeader />
      <main className={s.outerContainer}>
        <Sidebar />
        <div className={s.innerContainer}>{children}</div>
      </main>
    </>
  );
};

export const getPrivateLayout = (page: ReactElement) => {
  return <PrivateLayout>{page}</PrivateLayout>;
};
