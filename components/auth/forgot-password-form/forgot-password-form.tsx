import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Trans } from '@/components/Trans/Trans';
import { CloseDialog, Modal } from '@/features';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import style from './forgot-password.module.scss';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    resetField,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: FormValuesType) => {
    setEmail(data.email);

    resetField('email');
  };

  function handleModalClosed() {
    setOpen(false);
  }
  function handleModalOpened() {
    if (isValid) {
      setOpen(true);
    }
  }

  return (
    <Card className={style.card}>
      <Typography.H1 style={{ paddingBottom: '37px' }}>
        {t.auth.forgotPasswordPage.title}
      </Typography.H1>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'email'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'text'}
              label={'Email'}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <Typography.Regular14 className={`${style.message} ${style.fontColor}`}>
          {t.auth.forgotPasswordPage.message}
        </Typography.Regular14>

        <Button fullWidth onClick={handleModalOpened} type={'submit'}>
          {t.auth.forgotPasswordPage.sendLink}
        </Button>

        <Modal
          onClose={handleModalClosed}
          open={open}
          showCloseButton
          title={t.auth.forgotPasswordPage.titleModal}
        >
          <Typography.Regular16 className={style.dialogDescription}>
            <Trans
              tags={{
                '1': () => <b>{`${email}`}</b>,
              }}
              text={t.auth.forgotPasswordPage.messageModal}
            />
          </Typography.Regular16>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
            <CloseDialog asChild>
              <Button className={style.dialogButton} variant={'primary'}>
                OK
              </Button>
            </CloseDialog>
          </div>
        </Modal>

        <Link href={'/signIn'}>
          <Button className={style.buttonBack} fullWidth variant={'tertiary'}>
            {t.auth.forgotPasswordPage.backToSignIn}
          </Button>
        </Link>
      </form>
      <div className={style.recaptcha}>recaptcha</div>
    </Card>
  );
};
