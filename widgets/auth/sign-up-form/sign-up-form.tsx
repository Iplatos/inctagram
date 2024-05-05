import React from 'react';
import { useForm } from 'react-hook-form';

import { useSignUpMutation } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, Typography } from '@/shared/ui';
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox';
import { ControlledTextField } from 'shared/ui/controlled-text-field';
import { Trans } from '@/widgets/Trans/Trans';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { z } from 'zod';

import s from 'widgets/auth/sign-up-form/sign-up.module.scss';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

const schema = z
  .object({
    checkbox: z.boolean(),
    confirm: z.string(),
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
    nickname: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(/^[0-9A-Za-z_-]+$/),
    password: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .refine(
        value =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])/.test(value),
        'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  });

type FormValues = z.input<typeof schema>;

export const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpTrigger] = useSignUpMutation();

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      checkbox: false,
      confirm: '',
      email: '',
      // 'nickname' is used instead of 'username' to disable the browser's autofill when clicking on this field, since the latter is reserved
      nickname: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  // if (signUpData) {
  //   router.push(`/email-sent`);
  //
  //   return null;
  // }

  const signUp = handleSubmit(({ email, nickname, password }) => {
    return signUpTrigger({ email, password, username: nickname });
  });

  const submitIsDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

  return (
    <div className={s.outerContainer}>
      <Card className={s.card}>
        <Typography.H1>{t.auth.signUpPage.title}</Typography.H1>
        <GitHubGoogleContainer />
        <form onSubmit={signUp}>
          {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}
          <div className={s.values}>
            <ControlledTextField
              control={control}
              disabled={isSubmitting}
              label={t.auth.signUpPage.labelName}
              name={'nickname'}
              placeholder={t.auth.signUpPage.labelName}
            />
            <ControlledTextField
              control={control}
              disabled={isSubmitting}
              label={t.auth.signUpPage.labelEmail}
              name={'email'}
              placeholder={t.auth.signInPage.email}
            />
            <ControlledTextField
              control={control}
              disabled={isSubmitting}
              inputType={'password'}
              label={t.auth.signUpPage.labelPassword}
              name={'password'}
              placeholder={t.auth.signInPage.password}
            />
            <ControlledTextField
              control={control}
              disabled={isSubmitting}
              inputType={'password'}
              label={t.auth.signUpPage.labelConfirm}
              name={'confirm'}
              placeholder={t.auth.signUpPage.labelConfirm}
            />
            <div className={s.checkbox}>
              <ControlledCheckbox
                control={control}
                disabled={isSubmitting}
                label={
                  <Trans
                    tags={{
                      agreement: ({ content }) => (
                        <Typography.SmallLink component={Link} href={'/terms-of-service'}>
                          {content}
                        </Typography.SmallLink>
                      ),
                      policy: ({ content }) => (
                        <Typography.SmallLink component={Link} href={'/privacy-policy'}>
                          {content}
                        </Typography.SmallLink>
                      ),
                    }}
                    text={t.auth.signUpPage.agreement}
                  />
                }
                name={'checkbox'}
              />
            </div>
          </div>
          <Button className={s.button} disabled={submitIsDisabled} fullWidth type={'submit'}>
            {t.auth.signUpPage.signUp}
          </Button>
        </form>
        <div className={s.bottom}>
          <Typography.Regular16>{t.auth.signUpPage.account}</Typography.Regular16>
        </div>
        <Button className={clsx(s.center, s.signUp)} variant={'text'}>
          <Link href={'/sign-in'}>{t.auth.signUpPage.signIn}</Link>
        </Button>
      </Card>
    </div>
  );
};
