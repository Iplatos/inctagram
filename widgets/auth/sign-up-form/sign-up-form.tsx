import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSignUpMutation } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, DEPRECATED_Card, Typography } from '@/shared/ui';
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Trans } from '@/widgets/Trans/Trans';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { z } from 'zod';

import s from 'widgets/auth/sign-up-form/sign-up.module.scss';

import { EmailSentModal } from './EmailSentModal';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpTrigger] = useSignUpMutation();
  const [openSentModal, setOpenSentModal] = useState(false);
  const [email, setEmail] = useState('');

  const schema = z
    .object({
      checkbox: z.boolean(),
      confirm: z.string(),
      email: z.string().email({ message: t.auth.signUpPage.emailExample }),
      nickname: z
        .string()
        .min(6, { message: 'Minimum number of characters 6' })
        .max(30, { message: 'Maximum number of characters 30' })
        .regex(/^[0-9A-Za-z_-]+$/, { message: t.auth.signUpPage.onlyLatin }),
      password: z
        .string()
        .min(6, { message: 'Minimum number of characters 6' })
        .max(20, { message: 'Maximum number of characters 20' })

        .regex(/[0-9]/, { message: t.auth.signUpPage.passMustDigit })
        .regex(/[a-z]/, { message: t.auth.signUpPage.passMustLowLetter })
        .regex(/[A-Z]/, { message: t.auth.signUpPage.passMustUpLetter })
        .regex(/[^A-Za-z0-9]/, {
          message: t.auth.signUpPage.passMustSpecialChar,
        })
        .regex(/^[0-9A-Za-z!@#$%^&*()_+=[\]{}|';:,.<>?-]+$/, {
          message: t.auth.signUpPage.onlyLatin,
        }),
    })
    .refine(data => data.password === data.confirm, {
      message: t.auth.signUpPage.passMustMatch,
      path: ['confirm'],
    });

  type FormValues = z.input<typeof schema>;
  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      checkbox: false,
      confirm: '',
      email: '',
      nickname: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });

  const onSuccessHandler = (email: string) => {
    setOpenSentModal(true);
    setEmail(email);
    reset();
  };

  const signUp = handleSubmit(({ email, nickname, password }) => {
    return signUpTrigger({
      body: { baseUrl: process.env.NEXT_PUBLIC_URL, email, password, userName: nickname },
      onSuccess: () => onSuccessHandler(email),
    });
  });

  return (
    <div className={s.outerContainer}>
      <EmailSentModal email={email} open={openSentModal} setOpen={() => setOpenSentModal(false)} />
      <DEPRECATED_Card className={s.card}>
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
          <Button
            className={s.button}
            disabled={!isValid || isSubmitting}
            fullWidth
            type={'submit'}
          >
            {t.auth.signUpPage.signUp}
          </Button>
        </form>
        <div className={s.bottom}>
          <Typography.Regular16>{t.auth.signUpPage.account}</Typography.Regular16>
        </div>
        <Button className={clsx(s.center, s.signUp)} component={'span'} variant={'text'}>
          <Link href={'/sign-in'}>{t.auth.signUpPage.signIn}</Link>
        </Button>
      </DEPRECATED_Card>
    </div>
  );
};
