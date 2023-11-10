import { useEffect } from 'react';

import { setTokenToLocalStorage } from '@/pages/api/base-api';
import { useRouter, useSearchParams } from 'next/navigation';

export const AuthConfirmed = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const accessToken = searchParams.get('accessToken');

  useEffect(() => {
    setTokenToLocalStorage(accessToken);
    router.push('/');
    //TODO : auth me query to setUser before redirect
  }, [accessToken]);
  if (accessToken) {
    return <div>...</div>;
  }

  return <div>some error</div>;
};
export default AuthConfirmed;
