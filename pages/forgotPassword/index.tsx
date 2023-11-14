import React, { useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { CreateNewPasswordForm, ForgotPasswordForm } from '@/components/auth';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <ForgotPasswordForm />
      {/* <CreateNewPasswordForm /> */}
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
