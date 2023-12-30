import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { PasswordResetForm } from '@/widgets/auth';

function PasswordReset() {
  return (
    <>
      <HeadMeta title={'Create new password'} />

      <PasswordResetForm />
    </>
  );
}

PasswordReset.getLayout = getLayout;
export default PasswordReset;
