import GitHubLogo from '@/assets/icons/gitHubLogo.svg';
import GoogleLogo from '@/assets/icons/googleLogo.svg';

import s from './gitHubGoogleContainer.module.scss';

export const GitHubGoogleContainer = () => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  )}&redirect_uri=${
    process.env.NEXT_PUBLIC_URL + '/auth/google-redirect'
  }&response_type=code&scope=email profile&access_type=offline`;

  const gitHubLoginUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/v1/auth/github/login?redirect_url=${encodeURIComponent(
    process.env.NEXT_PUBLIC_URL + '/auth'
  )}`;

  return (
    <div className={s.gitHubGoogleContainer}>
      <GoogleLogo onClick={() => window.location.assign(googleLoginUrl)} />
      <GitHubLogo onClick={() => (window.location.href = gitHubLoginUrl)} />
    </div>
  );
};
