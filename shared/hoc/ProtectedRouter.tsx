import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import { LocaleType } from '@/locales/ru';
import { useGoogleLoginMutation, useRefreshTokenQuery } from '@/shared/api/auth-api';
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

    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //TODO: in the future, we need to remove the Google login logic from here

    const [googleLogin, { isLoading: isGoogleLoginLoading }] = useGoogleLoginMutation();
    const {
      data: refreshTokenData,
      isError: isAuthError,
      isLoading: isRefreshing,
      isSuccess: isRefreshingSuccess,
    } = useRefreshTokenQuery(undefined, {
      skip: !isAuthChecked,
    });

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        googleLogin({ code, redirectUrl: process.env.NEXT_PUBLIC_URL })
          .unwrap()
          .then(() => {
            setIsAuthChecked(true);
          })
          .catch(error => {
            setIsAuthChecked(true);
          });
      } else {
        setIsAuthChecked(true);
      }
    }, [googleLogin]);

    useEffect(() => {
      if (isAuthChecked && !isRefreshing) {
        if (isAuthError || !refreshTokenData) {
          void router.push('/public-posts');
        } else {
          setIsLoading(false);
        }
      }
    }, [isAuthChecked, isRefreshing, isAuthError, refreshTokenData, router]);

    const getLayout = Page?.getLayout ?? ((page: ReactNode) => page);

    if (!isRefreshingSuccess || isLoading || isGoogleLoginLoading) {
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
