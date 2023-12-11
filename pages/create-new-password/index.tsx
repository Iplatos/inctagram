import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { CreateNewPasswordForm } from '@/widgets/auth';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Create new password'} />

      <CreateNewPasswordForm />
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
