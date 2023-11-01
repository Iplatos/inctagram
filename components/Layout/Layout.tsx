import { PropsWithChildren, ReactElement } from 'react';

import { NavBar } from '@/components/NavBar/NavBar';
import { SideBar } from '@/components/shared/SideBar/SIdeBar';
import { NextPage } from 'next';

export const Layout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <main>
      <NavBar />

      {children}
      <SideBar />
    </main>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
