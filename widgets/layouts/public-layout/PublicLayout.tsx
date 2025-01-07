import { PropsWithChildren, ReactElement } from 'react';

import { NotificationCenter } from '@/features/notification-center/notification-center';
import { PublicHeader } from '@/widgets/layouts/public-layout/public-header';
import { NextPage } from 'next';

import s from './public-layout.module.scss';

export const PublicLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PublicHeader />
      <main className={s.outerContainer}>
        <div className={s.innerContainer}>{children}</div>
      </main>
      <NotificationCenter />
    </>
  );
};

export const getPublicLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};
