import { FC, ReactNode } from 'react';

import * as TabsRadix from '@radix-ui/react-tabs';
import Link from 'next/link';

import style from './tabs.module.scss';

export type TabType = {
  disabled?: boolean;
  title: string;
  value: string;
};

type CommonProps = {
  children?: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tabs: TabType[];
  value?: string;
};

type ConditionalProps =
  | {
      fullWidth?: boolean;
    }
  | {
      fullWidth?: never;
    };

export type TabsProps = CommonProps & ConditionalProps;

export type TabContentProps = {
  children: ReactNode;
  value: string;
};

export const Tabs = (props: TabsProps) => {
  const { children, defaultValue, fullWidth, onValueChange, tabs, value } = props;

  return (
    <TabsRadix.Root
      className={style.root}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      <TabsRadix.List className={style.list}>
        {tabs.map(tab => (
          <TabsRadix.Trigger
            className={`${style.trigger} ${fullWidth && style.fullWidth} `}
            disabled={tab.disabled}
            key={tab.value}
            tabIndex={1}
            value={tab.value}
          >
            {tab.title}
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  );
};

export const TabContent = (props: TabContentProps) => {
  const { children, value } = props;

  return (
    <TabsRadix.Content className={style.content} value={value}>
      {children}
    </TabsRadix.Content>
  );
};
