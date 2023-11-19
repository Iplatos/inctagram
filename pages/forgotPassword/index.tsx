import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <ForgotPasswordForm />
      {/*<ForgotPasswordForm />*/}
    </>
  );
}

//          //"8c9252c9-bff2-49e1-8027-38883b2d5cc5", -INCTAGRAM_TRAINEE_FRONT_TOKEN_HEROKU , incubator-icta-trainee
//INCTAGRAM_TRAINEE_FRONT_TOKEN
ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
