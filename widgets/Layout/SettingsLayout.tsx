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
      <div style={{ marginLeft: '220px', paddingTop: '60px' }}>
        <EditProfile />
      </div>
      {children}
    </Layout>
  );
};

export function getSettingsLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
}
