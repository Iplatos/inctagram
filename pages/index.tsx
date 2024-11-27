import React from 'react';

import { ProtectedRouter } from '@/shared/hoc/ProtectedRouter';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <div>Hello World!</div>
    </>
  );
}

Home.getLayout = getPrivateLayout;
export default ProtectedRouter(Home);
