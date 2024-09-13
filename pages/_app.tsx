import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { useLoader } from '@/features/hooks/progressLoader/useLoader';
import { wrapper } from '@/shared/api/store';
import { setupListeners } from '@reduxjs/toolkit/query';

import '../styles/index.scss';
import '../styles/nprogress.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout ?? (page => page);

  useLoader();

  return <Provider store={store}>{getLayout(<Component {...props.pageProps} />)}</Provider>;
}
