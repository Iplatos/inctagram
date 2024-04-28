import { useEffect, useState } from 'react';

import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@/entities/accounts/edit';
import { concatString } from '@/shared/helpers/concatString';
import { TabContent, Tabs } from '@/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './edit-profile.module.scss';

const tabs = [
  {
    title: 'General information',
    value: 'general-information',
  },
  {
    title: 'Devices',
    value: 'devices',
  },
  {
    title: 'Account Management',
    value: 'account-management',
  },
  {
    title: 'My payments',
    value: 'my-payments',
  },
];

export const EditProfile = () => {
  const router = useRouter();
  const initialTab = router.query.tab;
  const [activeTab, setActiveTab] = useState<string | string[]>(
    initialTab || 'general-information'
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push({ query: { account: value } });
  };

  console.log(activeTab);

  useEffect(() => {
    setActiveTab(router.query.account);
  }, [router.query.tab]);

  return (
    <div className={style.profileContainer}>
      <Tabs
        defaultValue={'general-information'}
        fullWidth
        onValueChange={handleTabChange}
        tabs={tabs}
        value={activeTab}
      >
        <TabContent value={'general-information'}>
          <GeneralInformation />
        </TabContent>
        <TabContent value={'devices'}>
          <Devices />
        </TabContent>
        <TabContent value={'account-management'}>
          <AccountManagement />
        </TabContent>
        <TabContent value={'my-payments'}>
          <MyPayments />
        </TabContent>
      </Tabs>
    </div>
  );
};
