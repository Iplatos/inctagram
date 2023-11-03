import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function LogIn() {
  return (
    <>
      <HeadMeta title={'Sign in'} />
      !!!!!!!!!!!Sign In page!!!!!!!!
    </>
  );
}

LogIn.getLayout = getLayout;
export default LogIn;
