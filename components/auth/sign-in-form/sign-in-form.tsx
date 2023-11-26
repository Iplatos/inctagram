import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setIsLoggedIn } from '@/components/auth/slices/auth';
import { useLoginMutation } from '@/pages/api/auth.service';
import { baseUrl } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui/Button/button';
import { Card } from '@/shared/ui/Card/Card';
import { TextField } from '@/shared/ui/textField/TextField';
import { Typography } from '@/shared/ui/typography';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import s from 'components/auth/sign-in-form/sign-in-form.module.scss';

import GitHubLogo from '../../../assets/icons/gitHubLogo.svg';
import GoogleLogo from '../../../assets/icons/googleLogo.svg';

const signInSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  password: z.string().min(3, { message: 'Invalid Password' }),
});

type FormValuesType = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login] = useLoginMutation();
  const onGoogle = () => {
    router.push(`${baseUrl}/api/v1/auth/google`);
  };

  const { t } = useTranslation();
  const onSubmit = (data: FormValuesType) => {
    login(data);
    dispatch(setIsLoggedIn(true));
    router.push(`/`);
  };
  const { clearErrors, control, errors, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  });

  return (
    /* eslint-disable */
    <Card className={s.signInFormContainer}>
      <div>
        <Typography.H1>{t.navbar.signIn}</Typography.H1>
      </div>
      <div className={s.gitHubGoogleContainer}>
        <GoogleLogo onClick={onGoogle} />
        <GitHubLogo />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFieldsContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onFocus={() => clearErrors("email")}
                errors={fieldState?.error?.message}
                onChange={field.onChange}
                value={field.value}
                label={"Email"}
                inputtype={"text"}

              />
            )}
          />
          <Controller
            control={control}
            name="password"

            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onFocus={() => clearErrors("password")}
                onChange={field.onChange}
                placeholder={"password"}
                label={"Password"}
                inputtype={"password"}
                errors={fieldState?.error?.message}
              />
            )}
          /></div>

        <div className={s.linksAndButtonsContainer}>
          <div className={s.forgotPasswordLink}>
            <Link href={"/forgotPassword"}>
              <Typography.Regular14 color={"var(--color-light-900)"}>
                {t.navbar.forgotPassword}
              </Typography.Regular14>
            </Link>
          </div>
          <Button style={{ width: "100%" }} type={"submit"}>
            {t.navbar.signIn}
          </Button>
          <Typography.Regular16>{t.auth.signInPage.dontHaveAcc}</Typography.Regular16>
          <Link href={"/signUp"}>{t.navbar.signUp}</Link>
        </div>
      </form>
    </Card>
    /* eslint-enable */
  );
};
