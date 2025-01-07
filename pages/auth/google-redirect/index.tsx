import { useEffect } from 'react';
import { HashLoader } from 'react-spinners';

import { Success } from '@/assets/icons/Success';
import { useGoogleLoginMutation } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks';
import { Card, Typography } from '@/shared/ui';
import { getPublicLayout } from '@/widgets/layouts';
import { useRouter } from 'next/router';

import style from './google-redirect.module.scss';

export const GoogleRedirect = () => {
  const router = useRouter();
  const t = useTranslation().t.auth.github;
  const [googleLogin, { isError, isLoading, isSuccess }] = useGoogleLoginMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code && !isLoading) {
      googleLogin({
        code: code,
        redirectUrl: process.env.NEXT_PUBLIC_URL + '/auth/google-redirect',
      });
    }
  }, [router, googleLogin, isLoading]);

  if (isError) {
    router.push('/sign-in');
  }
  if (isSuccess) {
    router.push('/');
  }

  if (isLoading) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <HashLoader color={'white'} size={200} />
      </div>
    );
  }

  return (
    <div className={style.githubPage}>
      <Card.Root>
        <Card.Content className={style.content}>
          <Success height={150} width={150} />
          <Typography.Large>{t.successMessage}</Typography.Large>
        </Card.Content>
      </Card.Root>
    </div>
  );
};

GoogleRedirect.getLayout = getPublicLayout;
export default GoogleRedirect;
