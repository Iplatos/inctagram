import { ReactElement, ReactNode, useEffect } from 'react';
import { HashLoader } from 'react-spinners';

import { LocaleType } from '@/locales/ru';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { useTranslation } from '@/shared/hooks';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, t: LocaleType) => ReactNode;
};

export const ProtectedRouter = (Page: Page) => {
  const Component = ({ pageProps }: AppProps) => {
    const router = useRouter();
    const { t } = useTranslation();
    const { push } = useRouter();
    const { isError: isAuthError, isLoading, isSuccess: isAuthSuccess } = useRefreshTokenQuery();

    useEffect(() => {
      if ((!isLoading && !isAuthSuccess) || isAuthError) {
        void push('sign-in');
        void router.push('/public-posts');
      }
    }, [isAuthSuccess, push, isLoading, isAuthError]);

    const getLayout = Page?.getLayout ?? ((page: ReactNode) => page);

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

    return getLayout(<Page {...pageProps} />, t);
  };

  return Component;
};
