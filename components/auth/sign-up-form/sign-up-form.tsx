import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { useSignUpMutation } from '@/pages/api/auth.service';
import { baseUrl } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, TextField, Typography } from '@/shared/ui';
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { omit } from 'next/dist/shared/lib/router/utils/omit';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'components/auth/sign-up-form/sign-up.module.scss';

const schema = z
  .object({
    checkbox: z.boolean(),
    confirm: z.string(),
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
    password: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .refine(
        value =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])/.test(value),
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    username: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(/^[0-9A-Za-z_-]+$/),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  });

type FormValues = z.input<typeof schema>;

export const SignUpForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [signUp, { data: signUpData, error }] = useSignUpMutation();
  const onGoogle = () => {
    router.push(`${baseUrl}/api/v1/auth/google`);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  if (signUpData) {
    router.push(`/email-sent`);
  }
  const handleFormSubmitted = handleSubmit(data => signUp(omit(data, ['confirm'])));

  return (
    <>
      {/*  <HeadMeta title={'Sign Up'} />
      Sign Up page
      <span>
        <Trans
          tags={{
            '1': () => <b>test1</b>,
            '2': () => <b>test2</b>,
          }}
          text={t.auth.signUpPage.agreement}
        />
      </span>*/}
      <div className={s.outerContainer}>
        <Card className={s.card}>
          <Typography.H1 className={s.center}>{t.auth.signUpPage.title}</Typography.H1>
          <div className={s.gitHubGoogleContainer}>
            <GoogleLogo onClick={onGoogle} />
            <GitHubLogo />
          </div>
          <form onSubmit={handleFormSubmitted}>
            <div className={s.values}>
              <div className={s.element}>
                <Controller
                  control={control}
                  name={'username'}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      errors={fieldState?.error?.message}
                      inputtype={'text'}
                      label={t.auth.signUpPage.labelName}
                      onChange={field.onChange}
                      placeholder={'username'}
                      value={field.value}
                    />
                  )}
                />
              </div>
              <div className={s.element}>
                <Controller
                  control={control}
                  name={'email'}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      errors={fieldState?.error?.message}
                      inputtype={'text'}
                      label={t.auth.signUpPage.labelEmail}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                />
              </div>
              <div className={s.element}>
                <Controller
                  control={control}
                  name={'password'}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      errors={fieldState?.error?.message}
                      inputtype={'password'}
                      label={t.auth.signUpPage.labelPassword}
                      onChange={field.onChange}
                      placeholder={'password'}
                    />
                  )}
                />
              </div>
              <div className={s.element}>
                <Controller
                  control={control}
                  name={'confirm'}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      errors={fieldState?.error?.message}
                      inputtype={'password'}
                      label={t.auth.signUpPage.labelСonfirm}
                      onChange={field.onChange}
                      placeholder={'password'}
                    />
                  )}
                />
              </div>
            </div>
            <div className={s.checkbox}>
              <ControlledCheckbox
                control={control}
                label={'I agree to the Terms of Service and Privacy Policy'}
                name={'checkbox'}
              />
            </div>

            <Button className={s.button} type={'submit'}>
              {t.auth.signUpPage.signUp}
            </Button>
          </form>
          <div className={s.bottom}>
            <Typography.Regular16>{t.auth.signUpPage.account}</Typography.Regular16>
          </div>
          <Button className={clsx(s.center, s.signUp)} variant={'text'}>
            {t.auth.signUpPage.signIn}
          </Button>
        </Card>
      </div>
    </>
  );
};
