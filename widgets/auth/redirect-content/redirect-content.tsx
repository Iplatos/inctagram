import { useForm } from 'react-hook-form';

import { useResendConfirmCodeMutation } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import { ControlledTextField } from '@/shared/ui/controlled';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

import style from './redirect-content.module.scss';

import EmailConfirmedImage from '../../../assets/img/email-confirmed-image.svg?url';
import LinkExpiredImage from '../../../assets/img/link-expired-image.svg?url';

export type ContentType = {
  emailConfirmed?: boolean;
  linkExpired?: boolean;
};

export const RedirectContent = (props: ContentType) => {
  const { emailConfirmed, linkExpired } = props;

  const resentCodeSchema = z.object({
    email: z.string().email('Неверный формат').min(1, 'Enter email'),
  });

  type FormValuesType = z.infer<typeof resentCodeSchema>;

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, submitCount },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(resentCodeSchema),
  });

  const onSubmit = (data: FormValuesType) => {
    resentCode({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL, email: data.email });
  };

  const [resentCode] = useResendConfirmCodeMutation();

  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <Typography.H1>{emailConfirmed && `${t.auth.emailConfirmedPage.title}`}</Typography.H1>
      <Typography.H1>{linkExpired && `${t.auth.linkExpiredPage.title}`}</Typography.H1>

      <div className={style.textBlock}>
        <Typography.Regular16>
          {emailConfirmed && `${t.auth.emailConfirmedPage.text}`}
        </Typography.Regular16>
        <Typography.Regular16>
          {linkExpired && `${t.auth.linkExpiredPage.text}`}
        </Typography.Regular16>
      </div>

      {emailConfirmed && (
        <Link href={'/signIn'}>
          <Button className={style.buttonSignIn}>{t.auth.emailConfirmedPage.textButton}</Button>
        </Link>
      )}

      {linkExpired && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            disabled={isSubmitting}
            label={t.auth.signInPage.email}
            name={'email'}
            placeholder={t.auth.signInPage.email}
          />
          <Button className={style.buttonExpired} type={'submit'}>
            {t.auth.linkExpiredPage.textButton}
          </Button>
        </form>
      )}

      {emailConfirmed && <Image alt={'Email Confirmed'} src={EmailConfirmedImage} />}
      {linkExpired && <Image alt={'Link Expired'} src={LinkExpiredImage} />}
    </div>
  );
};
