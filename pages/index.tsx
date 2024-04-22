import React from 'react';

import { selectIsAuthenticated } from '@/shared/api/app-slice';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useAppSelector } from '@/shared/api/pretyped-redux-hooks';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  const isAuth = useAppSelector(selectIsAuthenticated);

  useRefreshTokenQuery(undefined, { skip: isAuth });

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
