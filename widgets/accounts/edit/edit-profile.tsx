import { log } from 'console';

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
export const EditProfile = () => {
  const router = useRouter();

  console.log(router);
  const tabs = [
    {
      title: 'General information',
      value: 'general information',
    },
    { title: 'Devices', value: 'devices' },
    { title: 'Account Management', value: 'account management' },
    { title: 'My payments', value: 'my payments' },
  ];

  const tabDefaultValue = () => {
    const index = tabs.findIndex(tab => '/settings/' + concatString(tab.value) === router.asPath);

    return index;
  };

  return (
    <div className={style.profileContainer}>
      <Tabs defaultValue={tabs[tabDefaultValue()].value} fullWidth isLink tabs={tabs}>
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
    </div>
  );
};
