import React from 'react';

import { Meta } from '@storybook/react';

import { TabContent, Tabs } from './tabs';

export default {
  args: {
    children: (
      <>
        <TabContent value={'val1'}>Контент 1</TabContent>
        <TabContent value={'val2'}>Контент 2</TabContent>
        <TabContent value={'val3'}>Контент 3</TabContent>
      </>
    ),
    defaultValue: 'val1',
    tabs: [
      { title: 'title 1', value: 'val1' },
      { title: 'title 2', value: 'val2' },
      { title: 'title 3', value: 'val3' },
    ],
  },
  component: Tabs,
  title: 'Components/Tabs',
} as Meta<typeof Tabs>;

export const Primary = {};
