import { useEffect } from 'react';

import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useRouter } from 'next/router';

//  Temporary solution until middleware-based authorization is implemented
export const useAuthRedirect = () => {
  const { isError: isAuthError, isSuccess } = useRefreshTokenQuery();
  const router = useRouter();

  useEffect(() => {
    if (isAuthError) {
      router.push('/sign-in');
    }
  }, [isAuthError, router]);

  return isSuccess;
};
