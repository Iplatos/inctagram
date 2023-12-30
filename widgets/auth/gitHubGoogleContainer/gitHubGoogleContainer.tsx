import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { baseUrl } from '@/shared/api/base-api';
import { useRouter } from 'next/navigation';

import s from './gitHubGoogleContainer.module.scss';

export const GitHubGoogleContainer = () => {
  const router = useRouter();
  const onGoogle = () => {
    router.push(`${baseUrl}/api/v1/auth/google`);
  };

  return (
    <div className={s.gitHubGoogleContainer}>
      <GoogleLogo onClick={onGoogle} />
      <GitHubLogo />
    </div>
  );
};
