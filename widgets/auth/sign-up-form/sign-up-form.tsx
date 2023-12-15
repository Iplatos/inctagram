import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { useGetMeQuery, useSignUpMutation } from '@/shared/api/auth.service';
import { baseUrl } from '@/shared/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, TextField, Typography } from '@/shared/ui';
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox';
import { Trans } from '@/widgets/Trans/Trans';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { omit } from 'next/dist/shared/lib/router/utils/omit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'widgets/auth/sign-up-form/sign-up.module.scss';

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
  const { data: meData } = useGetMeQuery();
  const router = useRouter();
  const { t } = useTranslation();
  const [signUp, { data: signUpData, error }] = useSignUpMutation();
  const onGoogle = () => {
    router.push(`${baseUrl}/api/v1/auth/google`);
  };
  const {
    clearErrors,
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

  if (meData) {
    router.push(`/`);
  }

  return (
    <div className={s.outerContainer}>
      <Card className={s.card}>
        <Typography.H1>{t.auth.signUpPage.title}</Typography.H1>

        <div className={s.gitHubGoogleContainer}>
          <GoogleLogo onClick={onGoogle} />
          <GitHubLogo />
        </div>

        <form onSubmit={handleFormSubmitted}>
          <div className={s.values}>
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
                  onFocus={() => clearErrors('username')}
                  placeholder={'username'}
                  value={field.value}
                />
              )}
            />

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
                  onFocus={() => clearErrors('email')}
                  value={field.value}
                />
              )}
            />

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
                  onFocus={() => clearErrors('password')}
                  placeholder={'password'}
                />
              )}
            />

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
                  onFocus={() => clearErrors('password')}
                  placeholder={'password'}
                />
              )}
            />
            {/*</div>*/}

            <div className={s.checkbox}>
              <ControlledCheckbox
                control={control}
                label={
                  <Typography.Regular12>
                    <Trans
                      tags={{
                        '1': () => (
                          <Link href={'/terms-of-service'}>
                            <span className={s.link}>Пользовательским соглашением</span>
                          </Link>
                        ),
                        '2': () => (
                          <Link className={s.link} href={'/privacy-policy'}>
                            <span className={s.link}>Политикой конфиденциальности</span>
                          </Link>
                        ),
                        '3': () => (
                          <Link className={s.link} href={'/terms-of-service'}>
                            <span className={s.link}>Terms of service</span>
                          </Link>
                        ),
                        '4': () => (
                          <Link className={s.link} href={'/privacy-policy'}>
                            <span className={s.link}>Privacy policy</span>
                          </Link>
                        ),
                      }}
                      text={t.auth.signUpPage.agreement}
                    />
                  </Typography.Regular12>
                }
                name={'checkbox'}
              />
            </div>
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
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
  );
};
