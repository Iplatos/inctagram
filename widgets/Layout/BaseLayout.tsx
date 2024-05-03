import { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/shared/api/store';
import { NavBar } from '@/widgets/NavBar/NavBar';
import { Header } from '@/widgets/header';
import { NextPage } from 'next';

import style from './BaseLayout.module.scss';

export const BaseLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <Provider store={store}>
      <div className={style.container}>
        <Header />
        <main className={style.main}>
          <NavBar />
          <div>{children}</div>
        </main>
      </div>
    </Provider>
  );
};

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>;
};
