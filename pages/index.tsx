import React from 'react';

import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  const { error, isLoading } = useRefreshTokenQuery();

  if (isLoading) {
    return <div style={{ marginLeft: '300px' }}>Init loading...</div>;
  }

  if (error && 'status' in error && error.status === 401) {
    return <div style={{ marginLeft: '300px' }}>Unauthorized</div>;
  }

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;
