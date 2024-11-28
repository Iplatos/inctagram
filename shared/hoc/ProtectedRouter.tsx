import { ReactElement, ReactNode, useEffect } from 'react';

import { Loader } from '@/features/hooks/loader/loader';
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
    const { push } = useRouter();
    const { isError: isAuthError, isLoading, isSuccess: isAuthSuccess } = useRefreshTokenQuery();

    const { t } = useTranslation();

    const getLayout = Page?.getLayout ?? (page => page);

    console.log(isAuthSuccess);

    useEffect(() => {
      if ((!isLoading && !isAuthSuccess) || isAuthError) {
        void push('sign-in');
      }
    }, [isAuthSuccess, push, isLoading, isAuthError]);

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
          <Loader />
        </div>
      );
    }

    return getLayout(<Page {...pageProps} />, t);
  };

  return Component;
};
