import { PropsWithChildren, ReactElement } from 'react';

import { NavBar } from '@/widgets/NavBar/NavBar';
import { CreatePostModal } from '@/widgets/create-post-modal';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';
import { Sidebar } from 'widgets/layouts/private-layout/sidebar';

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
        <CreatePostModal />
        <div className={s.innerContainer}>{children}</div>
      </main>
      {process.env.NEXT_PUBLIC_MODE === 'development' && <NavBar />}
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
