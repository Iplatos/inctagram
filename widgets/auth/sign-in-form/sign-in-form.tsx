import React from 'react';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, DEPRECATED_Card, Typography } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'widgets/auth/sign-in-form/sign-in-form.module.scss';

const DevTool: React.ElementType = dynamic(
  () => import('@hookform/devtools').then(module => module.DevTool),
  { ssr: false }
);

export const SignInForm = () => {
  const { t } = useTranslation();
  const signInSchema = z.object({
    email: z.string().email(t.auth.signInPage.invalidEmail).min(1, 'Enter email'),
    password: z
      .string()
      .min(6, { message: t.auth.signInPage.invalidPass })
      .max(20, { message: t.auth.signInPage.invalidPass })
      .regex(/^[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/, {
        message: t.auth.signInPage.invalidPass,
      }),
  });

  const router = useRouter();
  const [login, { data: loginData }] = useLoginMutation();

  type FormValuesType = z.infer<typeof signInSchema>;
  const onSubmit = (data: FormValuesType) => {
    return login(data);
  };

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  });

  // if (loginData) {
  //   router.push(`/`);
  //
  //   return null;
  // }

  const submitIsDisabled = !isDirty || (!isValid && !!submitCount) || isSubmitting;

  return (
    <DEPRECATED_Card className={s.signInFormContainer}>
      <Typography.H1>{t.navbar.signIn}</Typography.H1>
      <GitHubGoogleContainer />

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {process.env.NEXT_PUBLIC_MODE === 'development' && <DevTool control={control} />}
        <ControlledTextField
          control={control}
          disabled={isSubmitting}
          label={t.auth.signInPage.email}
          name={'email'}
          placeholder={t.auth.signInPage.email}
        />
        <ControlledTextField
          control={control}
          disabled={isSubmitting}
          inputType={'password'}
          label={t.auth.signInPage.password}
          name={'password'}
          placeholder={t.auth.signInPage.password}
        />
        <Typography.Regular14
          className={s.forgotPasswordLink}
          color={'var(--color-light-900)'}
          component={Link}
          href={'/forgot-password'}
        >
          {t.navbar.forgotPassword}
        </Typography.Regular14>
        <Button disabled={submitIsDisabled} fullWidth type={'submit'}>
          {t.navbar.signIn}
        </Button>

        <Typography.Regular16>{t.auth.signInPage.dontHaveAcc}</Typography.Regular16>

        <Button component={'span'} variant={'text'}>
          <Link href={'/sign-up'}>{t.navbar.signUp}</Link>
        </Button>
      </form>
    </DEPRECATED_Card>
  );
};
