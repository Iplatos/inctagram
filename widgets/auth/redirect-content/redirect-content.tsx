import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Typography } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';

import style from './redirect-content.module.scss';

import EmailConfirmedImage from '../../../assets/img/email-confirmed-image.svg?url';
import LinkExpiredImage from '../../../assets/img/link-expired-image.svg?url';

export type ContentType = {
  emailConfirmed?: boolean;
  linkExpired?: boolean;
};

export const RedirectContent = (props: ContentType) => {
  const { emailConfirmed, linkExpired } = props;
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
        <Button className={style.buttonSignIn} component={'span'}>
          <Link href={'/sign-in'}>{t.auth.emailConfirmedPage.textButton}</Link>
        </Button>
      )}

      {linkExpired && (
        <Button className={style.buttonExpired}>{t.auth.linkExpiredPage.textButton}</Button>
      )}

      {emailConfirmed && <Image alt={'Email Confirmed'} src={EmailConfirmedImage} />}
      {linkExpired && <Image alt={'Link Expired'} src={LinkExpiredImage} />}
    </div>
  );
};
