import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { TextField } from '@/shared/ui/textField/TextField';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />
      <ForgotPasswordForm />
      <TextField isSearchInput value={'as'} />
    </>
    // <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '72px' }}>

    // </div>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
