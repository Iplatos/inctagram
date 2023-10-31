import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />
      Forgot Password ?
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
