import React from 'react';

import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@/entities/accounts/edit';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { TabContent, Tabs } from '@/shared/ui';

const tabs = [
  { key: 'generalInformation', value: 'general information' } as const,
  { key: 'devices', value: 'devices' } as const,
  { key: 'accountManagement', value: 'account management' } as const,
  { key: 'myPayments', value: 'my payments' } as const,
] as const;

export const EditProfile = () => {
  const { editProfile: t } = useTranslation().t;

  return (
    <Tabs
      defaultValue={'general information'}
      fullWidth
      tabs={tabs.map(({ key, value }) => ({
        title: t.tabs[key].label,
        value,
      }))}
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
    </Tabs>
  );
};
