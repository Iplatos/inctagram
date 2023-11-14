import React, { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';

import { useSignUpMutation } from '@/pages/api/auth.service';
import { baseUrl } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, Checkbox, TextField, Typography } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { omit } from 'next/dist/shared/lib/router/utils/omit';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'pages/signUp/sign-up.module.scss';

const schema = z
  .object({
    confirm: z.string().min(2),
    email: z.string(),
    password: z.string().min(2),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

type FormValues = z.input<typeof schema>;

export const SignUp = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [signUp, { error }] = useSignUpMutation();
  const onGoogle = () => {
    router.push(`${baseUrl}/api/v1/auth/google`);
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmitted = handleSubmit(data => signUp(omit(data, ['confirm'])));

  useEffect(() => {
    if (
      error &&
      'status' in error &&
      'data' in error &&
      error.status === 400 &&
      typeof error.data === 'object' &&
      error.data &&
      'errorMessages' in error.data &&
      Array.isArray(error.data.errorMessages)
    ) {
      error.data.errorMessages.forEach((errorMessage: any) => {
        setError(errorMessage.field, {
          message: errorMessage.message as string,
          type: 'custom',
        });
      });
    }
  }, [error]);

  const [username, setUsername] = useState<string>('');
  const [checked, setChecked] = useState(false);

  const handleUsernameChange = (newValue: string) => {
    setUsername(newValue);
  };

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
          <Typography.H1 className={s.center}>Sign Up</Typography.H1>
          <div className={s.gitHubGoogleContainer}>
            <GoogleLogo onClick={onGoogle} />
            <GitHubLogo />
          </div>
          <form onSubmit={handleFormSubmitted}>
            <div className={s.values}>
              <div className={s.element}>
                <TextField
                  inputtype={'text'}
                  label={'Username'}
                  onChange={handleUsernameChange}
                  placeholder={'Username'}
                  value={username}
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
                      label={'Email'}
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
                      label={'Password'}
                      onChange={field.onChange}
                      placeholder={'password'}
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
                      label={'Password'}
                      onChange={field.onChange}
                      placeholder={'password'}
                    />
                  )}
                />
              </div>
            </div>
            <div className={s.checkbox}>
              <Checkbox
                checked={checked}
                label={'I agree to the Terms of Service and Privacy Policy'}
                onChange={() => setChecked(!checked)}
              />
            </div>

            <Button className={s.button} type={'submit'}>
              Sign Up
            </Button>
            <div className={s.bottom}>
              <Typography.Regular16>Do you have an account?</Typography.Regular16>
            </div>
            <Button className={clsx(s.center, s.signUp)} variant={'text'}>
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
