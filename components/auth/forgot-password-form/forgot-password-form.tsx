import React, { useState } from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { useRouter } from 'next/navigation';

import style from './forgot-password.module.scss';

import Modal from '../modal/modal';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <Card className={style.card}>
      <Typography.H1 style={{ paddingBottom: '37px' }}>
        {t.auth.ForgotPasswordPage.title}
      </Typography.H1>

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
          {t.auth.ForgotPasswordPage.message}
        </Typography.Regular14>

        <Modal onOpenChange={() => setOpen(!open)} open={open}>
          <Modal.Button asChild>
            <Button className={style.button} disabled={email === '' && true} type={'submit'}>
              {t.auth.ForgotPasswordPage.sendLink}
            </Button>
          </Modal.Button>
          <Modal.Content title={'Email Sent'} />
        </Modal>

        <Button
          className={style.button}
          onClick={() => router.push('/signIn')}
          variant={'tertiary'}
        >
          {t.auth.ForgotPasswordPage.backToSignIn}
        </Button>
      </form>
      <div className={style.recaptcha}>recaptcha</div>
    </Card>
  );
};
