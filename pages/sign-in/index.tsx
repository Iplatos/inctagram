import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { SignInForm } from '@/widgets/auth/sign-in-form/sign-in-form';
import { getPublicLayout } from '@/widgets/layouts';

function LogIn() {
  return (
    <>
      <HeadMeta title={'Sign in'} />
      <SignInForm />
    </>
  );
}

LogIn.getLayout = getPublicLayout;
export default LogIn;
