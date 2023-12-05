import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { SignUpForm } from '@/components/auth/sign-up-form';

function SignUp() {
  return (
    <>
      <HeadMeta title={'Sign up'} />
      <SignUpForm />
    </>
  );
}

SignUp.getLayout = getLayout;
export default SignUp;
