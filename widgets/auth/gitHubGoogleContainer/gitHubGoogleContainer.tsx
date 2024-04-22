import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';
import { useRouter } from 'next/navigation';

import s from './gitHubGoogleContainer.module.scss';

export const GitHubGoogleContainer = () => {
  const router = useRouter();
  const onGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`);
  };

  return (
    <div className={s.gitHubGoogleContainer}>
      <GoogleLogo onClick={onGoogle} />
      <GitHubLogo />
    </div>
  );
};
