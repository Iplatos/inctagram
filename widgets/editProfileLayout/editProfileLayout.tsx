import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { Tabs } from '@/shared/ui/tabs';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './EditProfileLayout.module.scss';

import { CommonLayout } from '../Layout/CommonLayout';
import { EditProfile } from '../accounts/edit/edit-profile';
import { Sidebar } from '../sidebar';
export const EditProfileLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;
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
    <CommonLayout>
      <main>
        <NavBar />
        <Sidebar />
        <div className={s.EditProfileContainer}>
          <div>
            <Tabs defaultValue={tabs[tabDefaultValue()].value} fullWidth isLink tabs={tabs}></Tabs>
          </div>

          {children}
        </div>
      </main>
    </CommonLayout>
  );
};
