import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function SignUp() {
  return (
    <>
      <HeadMeta title={'Sign Up'} />
      Sign Up page
    </>
  );
}

SignUp.getLayout = getLayout;
export default SignUp;
