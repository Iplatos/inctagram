import { Controller, useForm } from 'react-hook-form';

import { useGetMeQuery, useLoginMutation } from '@/shared/api/auth.service';
import { setTokenToLocalStorage } from '@/shared/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { Typography } from '@/shared/ui/typography';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'widgets/auth/sign-in-form/sign-in-form.module.scss';

export const SignInForm = () => {
  const { data: meData, error: meError, isLoading: isMeLoading } = useGetMeQuery();
  const { t } = useTranslation();
  const signInSchema = z.object({
    email: z.string().email(t.auth.signInPage.invalidEmail).nonempty('Enter email'),
    password: z
      .string()
      .min(6, { message: t.auth.signInPage.invalidPass })
      .max(20, { message: t.auth.signInPage.invalidPass })
      /* eslint-disable */
      .regex(/^[0-9A-Za-z!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/, {
        message: t.auth.signInPage.invalidPass,
      }),
    /* eslint-enable */
  });

  const router = useRouter();
  const [login, { data: loginData }] = useLoginMutation();

  type FormValuesType = z.infer<typeof signInSchema>;
  const onSubmit = (data: FormValuesType) => {
    login(data);
  };
  const { clearErrors, control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  });

  if (isMeLoading) {
    return <div>hello</div>;
  }

  if (loginData) {
    setTokenToLocalStorage(loginData.accessToken);
    router.push(`/`);
  }
  if (meData && !meError) {
    router.push(`/`);
  }
  console.log(meData);

  return (
    /* eslint-disable */
    <Card className={s.signInFormContainer}>
      {/* <div> */}
      <Typography.H1>{t.navbar.signIn}</Typography.H1>
      {/* </div> */}
      <GitHubGoogleContainer />

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {/* <div className={s.textFieldsContainer}> */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onFocus={() => clearErrors('email')}
              error={fieldState?.error?.message}
              onChange={field.onChange}
              value={field.value}
              label={t.auth.signInPage.email}
              placeholder={t.auth.signInPage.email}
              inputType={'text'}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onFocus={() => clearErrors('password')}
              onChange={field.onChange}
              placeholder={t.auth.signInPage.password}
              label={t.auth.signInPage.password}
              error={fieldState?.error?.message}
              inputType={'password'}
            />
          )}
        />
        {/* </div> */}

        {/* <div className={s.linksAndButtonsContainer}> */}
        <div className={s.forgotPasswordLink}>
          <Link href={'/forgot-password'}>
            <Typography.Regular14 color={'var(--color-light-900)'}>
              {t.navbar.forgotPassword}
            </Typography.Regular14>
          </Link>
        </div>

        <Button style={{ width: '100%' }} type={'submit'}>
          {t.navbar.signIn}
        </Button>

        {/* <div className=''> */}
        <Typography.Regular16>{t.auth.signInPage.dontHaveAcc}</Typography.Regular16>

        <Button variant="text">
          <Link href={'/signUp'}>{t.navbar.signUp}</Link>
        </Button>
        {/* </div> */}

        {/* </div> */}
      </form>
    </Card>
    /* eslint-enable */
  );
};
