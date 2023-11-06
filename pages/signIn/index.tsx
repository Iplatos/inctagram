import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { SignInForm } from '@/components/auth/sign-in-form/sign-in-form';

function LogIn() {
  return (
    <>
      <HeadMeta title={'Sign in'} />
      <SignInForm />
    </>
  );
}

LogIn.getLayout = getLayout;
export default LogIn;
