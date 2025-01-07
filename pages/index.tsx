import React from 'react';

import { ProtectedRouter } from '@/shared/hoc/ProtectedRouter';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';
import { Publications } from '@/widgets/publications';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <Publications />
    </>
  );
}

Home.getLayout = getPrivateLayout;
export default ProtectedRouter(Home);
