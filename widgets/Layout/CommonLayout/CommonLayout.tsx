import { PropsWithChildren, ReactElement } from 'react';

import { NextPage } from 'next';

import style from './CommonLayout.module.scss';

import { Sidebar } from '../../sidebar';
import { BaseLayout } from '../BaseLayout';

export const CommonLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <BaseLayout>
      <Sidebar />
      <div className={style.container}>{children}</div>
    </BaseLayout>
  );
};

export const getCommonLayout = (page: ReactElement) => {
  return <CommonLayout>{page}</CommonLayout>;
};
