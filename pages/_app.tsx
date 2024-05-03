import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import type { ReactElement, ReactNode } from 'react';

import { useLoader } from '@/features/hooks/progressLoader/useLoader';

import '../styles/index.scss';
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

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  useLoader();

  return getLayout(<Component {...pageProps} />);
}
