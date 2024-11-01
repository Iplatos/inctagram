import { PropsWithChildren, ReactElement, useEffect } from 'react';

import { NotificationCenter } from '@/features/notification-center/notification-center';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useLazyGetMeQuery } from '@/shared/api/users-api';
import { Typography } from '@/shared/ui';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { NextPage } from 'next';

import s from './Layout.module.scss';

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  // FIXME: UNCOMMENT NEXT BLOCK OF CODE TO ENABLE AUTHENTICATION LOGIC!!!
  //  IT WAS DISABLED ONLY FOR TESTING/DEVELOPMENT PURPOSES

  // const { isLoading: isAuthorizing, isSuccess: isAuthSuccess } = useRefreshTokenQuery();
  // const [getMyProfile, { isError: isMeError, isLoading: isMeLoading }] = useLazyGetMeQuery();

  // useEffect(() => {
  //   if (isAuthSuccess) {
  //     getMyProfile(undefined, true);
  //   }
  // }, [isAuthSuccess, getMyProfile]);

  // if (isAuthorizing) {
  //   children = <Typography.H1>Authorizing...</Typography.H1>;
  // }
  // if (isMeError) {
  //   children = <Typography.H1>Profile loading error</Typography.H1>;
  // }
  // if (isMeLoading) {
  //   children = <Typography.H1>Loading profile data...</Typography.H1>;
  // }

  return (
    <>
      <Header />
      <main className={s.outerContainer}>
        <Sidebar />
        <div className={s.innerContainer}>{children}</div>
      </main>
      <NotificationCenter />
      {process.env.NEXT_PUBLIC_MODE === 'development' && <NavBar />}
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
