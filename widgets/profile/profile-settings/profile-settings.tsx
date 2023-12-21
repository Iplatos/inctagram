import React from 'react';

import { TabContent, Tabs } from '@/shared/ui';

import style from './profile-settings.module.scss';

export const ProfileSettingsContent = () => {
  return (
    <div className={style.profileContainer}>
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
        <TabContent value={'general information'}>
          Контент 1<div>ertnbertn</div>
        </TabContent>
        <TabContent value={'devices'}>Контент 2</TabContent>
        <TabContent value={'account management'}>Контент 3</TabContent>
        <TabContent value={'my payments'}>Контент 4</TabContent>
      </Tabs>
    </div>
  );
};
