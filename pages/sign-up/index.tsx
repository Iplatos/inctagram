import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { SignUpForm } from '@/widgets/auth/sign-up-form';
import { getPublicLayout } from '@/widgets/layouts';

function SignUp() {
  return (
    <>
      <HeadMeta title={'Sign up'} />
      <SignUpForm />
    </>
  );
}

SignUp.getLayout = getPublicLayout;
export default SignUp;
