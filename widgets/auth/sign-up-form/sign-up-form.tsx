import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { EmailSentModal } from '@/entities/modals/email-sent-modal/EmailSentModal';
import { useSignUpMutation } from '@/shared/api/auth-api';
import { ROUTERS } from '@/shared/constants';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, Typography } from '@/shared/ui';
import { ControlledCheckbox } from '@/shared/ui/checkbox/controlled-checkbox';
import { ControlledTextField } from '@/shared/ui/controlled';
import { Trans } from '@/widgets/Trans/Trans';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { SignUpFormValues, signUpSchema } from '@/widgets/auth/sign-up-form/signUpValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import s from 'widgets/auth/sign-up-form/sign-up.module.scss';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export const SignUpForm = () => {
  const { t } = useTranslation();
  const [signUpTrigger, data] = useSignUpMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const schema = signUpSchema(t);

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFormValues>({
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

  const signUp = handleSubmit(async ({ email, nickname, password }) => {
    try {
      await signUpTrigger({ email, password, username: nickname }).unwrap();
      if (data.data?.resultCode === 0) {
        setOpen(true);
        setEmail(email);
        reset();
      } else if (data.data?.resultCode === 1) {
        // @ts-ignore
        if (data.data?.errors[0].message === 'user with username is exist') {
          setError('nickname', {
            message: t.auth.signUpPage.errorUsername,
          });
        } else {
          setError('email', {
            message: t.auth.signUpPage.errorEmail,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  });

  const submitIsDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

  return (
    <div className={s.outerContainer}>
      <EmailSentModal email={email} isOpen={open} setOpen={setOpen} />
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
          <Link href={ROUTERS.SIGN_IN}>{t.auth.signUpPage.signIn}</Link>
        </Button>
      </Card>
    </div>
  );
};
