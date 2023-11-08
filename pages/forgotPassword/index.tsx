import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth';
import { PopupEmailSent } from '@/components/auth/popup-email-sent/popup-email-sent';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />
      <ForgotPasswordForm />
      <PopupEmailSent />
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
