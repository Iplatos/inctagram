import React, { useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { Card } from '@/shared/ui/Card/Card';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';

function ForgotPassword() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#171717',
          padding: '24px',
          width: '378px',
          boxSizing: 'border-box',
          border: '1px solid #333333',
          borderRadius: '2px',
          margin: '0 auto',
        }}
      >
        <Typography.H1 style={{ paddingBottom: '37px' }}>Forgot Password</Typography.H1>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">
            <Typography.Regular14 style={{ color: '#8D9094' }}>Email</Typography.Regular14>
          </label>

          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Typography.Regular14 style={{ color: '#8D9094' }}>
            Enter your email address and we will send you further instructions
          </Typography.Regular14>
          <Button disabled={disabled} type="submit">
            Send Link
          </Button>
          <Button variant="tertiary">Back to Sign In</Button>
          <div style={{ width: '300px', height: '84px', border: '1px solid #333333' }}>
            recaptcha
          </div>
        </form>
      </div>
    </>
  );
}

ForgotPassword.getLayout = getLayout;
export default ForgotPassword;
