import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <ForgotPasswordForm />
      {/*  <ForgotPasswordForm />*/}
    </>
  );
}

//INCTAGRAM_TRAINEE_FRONT_TOKEN
ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
