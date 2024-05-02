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

  const tabs = [
    {
      title: 'General information',
      value: 'general-information',
    },
    { title: 'Devices', value: 'devices' },
    { title: 'Account Management', value: 'account-management' },
    { title: 'My payments', value: 'my-payments' },
  ];

  const tabDefaultValue = () => {
    const index = tabs.findIndex(tab => '/settings/' + tab.value === router.asPath);

    return index;
  };

  return (
    <div className={style.profileContainer}>
      <Tabs defaultValue={tabs[tabDefaultValue()].value} fullWidth isLink tabs={tabs}></Tabs>
    </div>
  );
};
