import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@/entities/accounts/edit';
import { store } from '@/shared/api/store';
import { TabContent, Tabs } from '@/shared/ui';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';
import Link from 'next/link';

import s from './editProfileLayout.module.scss';

import { EditProfile } from '../accounts/edit/edit-profile';
import { Sidebar } from '../sidebar';

export const EditProfileLayOut: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Provider store={store}>
      <Header />
      <main>
        <NavBar />
        <Sidebar />
        <div className={s.profileContainer}>
          <Tabs
            defaultValue={'general information'}
            fullWidth
            tabs={[
              {
                title: 'General information',
                value: 'general information',
              },
              { title: 'Devices', value: 'devices' },
              { title: 'Account Management', value: 'account management' },
              { title: 'My payments', value: 'my payments' },
            ]}
          >
            {/* <TabContent value={'general information'}>
              <GeneralInformation />
            </TabContent>
            <TabContent value={'devices'}>
              <Devices />
            </TabContent>
            <TabContent value={'account management'}>
              <AccountManagement />
            </TabContent>
            <TabContent value={'my payments'}>
              <MyPayments />
            </TabContent> */}
          </Tabs>
          <EditProfile />
          {children}
        </div>
      </main>
    </Provider>
  );
};
