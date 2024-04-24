import React from 'react';

import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@/entities/accounts/edit';
import { TabContent, Tabs } from '@/shared/ui';
import Link from 'next/link';

import style from './edit-profile.module.scss';

export const EditProfile = () => {
  return (
    <div className={style.profileContainer}>
      {/* <Tabs
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
        <TabContent value={'general information'}>
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
        </TabContent>
      </Tabs> */}
    </div>
  );
};
