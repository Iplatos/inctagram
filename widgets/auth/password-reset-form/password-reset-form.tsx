import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Trans } from '@/widgets/Trans/Trans';
import { Modal } from '@/features';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import style from './password-reset-form.module.scss';
import { useChangePasswordMutation } from '@/shared/api/auth.service';
import { useSearchParams } from 'next/navigation';

export const PasswordResetForm = () => {
  const { t } = useTranslation();

  const signInSchema = z
    .object({
      confirmPassword: z.string(),
      password: z
        .string()
        .min(6, { message: t.auth.createNewPasswordPage.passwordMinZod })
        .max(20, { message: t.auth.createNewPasswordPage.passwordMaxZod })
        .refine(
          value =>
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])/.test(value),
          t.auth.createNewPasswordPage.passwordRefineZod
        ),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t.auth.createNewPasswordPage.confirmPasswordZod,
      path: ['confirmPassword'],
    });

  type FormValuesType = z.infer<typeof signInSchema>;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signInSchema),
  });

  // https://incubator-icta-trainee.uk/password-reset?userId=3db0ac99-c78b-4d00-89de-7bf82a4942bc&code=c0f2e6a9aead0c45220462df69ef1d01cbabbf062276624306cedeff63d02c17b5b6f76659d6300b436f753bb0012959
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const userId = searchParams.get('userId');

  console.log(userId);

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = (data: FormValuesType) => {
    changePassword({
      code: code,
      password: data.password,
      userId: userId,
    });
  };

  return (
    <Card className={style.card}>
      <Typography.H1 style={{ paddingBottom: '37px' }}>
        {t.auth.createNewPasswordPage.title}
      </Typography.H1>

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'password'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'password'}
              label={'New Password'}
              onChange={field.onChange}
              placeholder={'password'}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name={'confirmPassword'}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              errors={fieldState?.error?.message}
              inputtype={'password'}
              label={'Password Confirmation'}
              onChange={field.onChange}
              placeholder={'password'}
              value={field.value}
            />
          )}
        />

        <Typography.Regular14 className={style.message}>
          {t.auth.createNewPasswordPage.message}
        </Typography.Regular14>

        <Button fullWidth type={'submit'}>
          {t.auth.forgotPasswordPage.sendLink}
        </Button>
      </form>
    </Card>
  );
};
