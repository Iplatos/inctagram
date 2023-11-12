import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import style from './forgot-password.module.scss';
import { Modal } from '@/features';
import { Trans } from '@/components/Trans/Trans';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const router = useRouter();

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
        {t.auth.ForgotPasswordPage.title}
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
          {t.auth.ForgotPasswordPage.message}
        </Typography.Regular14>

        <Button
          className={style.buttonTrigger}
          fullWidth
          onClick={handleModalOpened}
          type={'submit'}
        >
          {t.auth.ForgotPasswordPage.sendLink}
        </Button>

        <Modal
          onClose={handleModalClosed}
          open={open}
          showCloseButton
          title={t.auth.ForgotPasswordPage.titleModal}
        >
          <Typography.Regular16 className={style.dialogDescription}>
            <Trans
              tags={{
                '1': () => <b>{`${email}`}</b>,
              }}
              text={t.auth.ForgotPasswordPage.messageModal}
            />
          </Typography.Regular16>
        </Modal>

        <Button
          className={style.buttonBack}
          fullWidth
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
