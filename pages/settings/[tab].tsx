import { useEffect, useState } from 'react';

import {
  AccountManagement,
  Devices,
  GeneralInformation,
  MyPayments,
} from '@/entities/accounts/edit';
import { TabContent, Tabs } from '@/shared/ui';
import { getCommonLayout } from '@/widgets/Layout/CommonLayout/CommonLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './[tab].module.scss';

import { NextPageWithLayout } from '../_app';

const tabs = [
  {
    component: GeneralInformation,
    title: 'General information',
    value: 'general-information',
  },
  {
    component: Devices,
    title: 'Devices',
    value: 'devices',
  },
  {
    component: AccountManagement,
    title: 'Account Management',
    value: 'account-management',
  },
  {
    component: MyPayments,
    title: 'My payments',
    value: 'my-payments',
  },
];

const TabComponent: NextPageWithLayout = () => {
  const router = useRouter();

  // const [activeTab, setActiveTab] = useState();

  // useEffect(() => {
  //   if (router.query.tab) {
  //     setActiveTab(router.query.tab);
  //     console.log(activeTab);
  //   }
  // }, []);

  // console.log(router);

  if (router.isReady) {
    return (
      <>
        <Tabs defaultValue={router.query.tab as string} tabs={tabs}>
          {tabs.map(tab => {
            const TabComponent = tab.component;

            return (
              <TabContent key={tab.value} value={tab.value}>
                <TabComponent />
              </TabContent>
            );
          })}
        </Tabs>
      </>
    );
  }
};

TabComponent.getLayout = getCommonLayout;
export default TabComponent;
