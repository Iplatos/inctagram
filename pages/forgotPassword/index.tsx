import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { Card } from '@/shared/ui/Card/Card';
import { Typography } from '@/shared/ui';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#333333',
          padding: '24px',
        }}
      >
        <Typography.H1>Forgot Password</Typography.H1>
        <form>
          <input type="password" />
          <Typography.Regular14>
            Enter your email address and we will send you further instructions
          </Typography.Regular14>
        </form>
      </div>
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
