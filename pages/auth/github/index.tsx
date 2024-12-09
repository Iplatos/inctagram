import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashLoader } from 'react-spinners';

import { GitHubLogo } from '@/assets/icons/GitHubLogo';
import { Success } from '@/assets/icons/Success';
import { accessTokenReceived } from '@/shared/api/app-slice';
import { useTranslation } from '@/shared/hooks';
import { Card, Typography } from '@/shared/ui';
import { getPublicLayout } from '@/widgets/layouts';
import { useRouter } from 'next/router';

import style from './github.module.scss';

export const Github = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslation().t.auth.github;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      dispatch(accessTokenReceived(accessToken));
      router.push('/');
    }
  }, [router]);

  return (
    <div className={style.githubPage}>
      <GitHubLogo height={200} width={200} />
      <Card.Root>
        <Card.Content className={style.content}>
          <Success height={150} width={150} />
          <Typography.Large>{t.successMessage}</Typography.Large>
        </Card.Content>
      </Card.Root>
    </div>
  );
};

Github.getLayout = getPublicLayout;
export default Github;
