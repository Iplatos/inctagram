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

import style from './create-new-password-form.module.scss';

const signInSchema = z
  .object({
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match',
    path: ['confirmPassword'],
  });

type FormValuesType = z.infer<typeof signInSchema>;

export const CreateNewPasswordForm = () => {
  const { t } = useTranslation();

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

  const onSubmit = (data: FormValuesType) => {
    console.log(data);

    // resetField('email');
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
