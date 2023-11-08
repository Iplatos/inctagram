import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />
      <ForgotPasswordForm />
    </>
    // <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '72px' }}>

    // </div>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
