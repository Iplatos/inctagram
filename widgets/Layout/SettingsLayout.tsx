import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';

import { EditProfile } from '../accounts';
import { Sidebar } from '../sidebar';
import { Layout } from './Layout';

export const SettingsLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Layout>
      <Sidebar />
      <EditProfile />
      {children}
    </Layout>
  );
};

export function getSettingsLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
}
