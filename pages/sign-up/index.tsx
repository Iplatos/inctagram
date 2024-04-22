import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { SignUpForm } from '@/widgets/auth/sign-up-form';

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
