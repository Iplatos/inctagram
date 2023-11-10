import React, { useState } from 'react';

import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

import style from './forgot-password.module.scss';

// import { PopupEmailSent } from '../popup-email-sent/popup-email-sent';

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  const [popupActive, setPopupActive] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    setPopupActive(!popupActive);
  };

  return (
    <Card className={style.card}>
      <Typography.H1 style={{ paddingBottom: '37px' }}>Forgot Password</Typography.H1>

      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor={'email'}>
          <Typography.Regular14 style={{ color: 'var(--color-light-900)' }}>
            Email
          </Typography.Regular14>
        </label>

        <input
          className={style.input}
          id={'email'}
          onChange={e => setEmail(e.target.value)}
          type={'email'}
          value={email}
        />

        <Typography.Regular14 className={style.text} style={{ color: 'var(--color-light-900)' }}>
          Enter your email address and we will send you further instructions
        </Typography.Regular14>

        <Button className={style.button} disabled={email === '' && true} type={'submit'}>
          Send Link
        </Button>

        <Button
          className={style.button}
          onClick={() => router.push('/signIn')}
          variant={'tertiary'}
        >
          Back to Sign In
        </Button>
      </form>
      <div className={style.recaptcha}>recaptcha</div>
    </Card>
  );
};
