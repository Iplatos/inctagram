import { ReactNode } from 'react';

import s from './alerts.module.scss';

export const Alerts = (props: PropsType) => {
  const { children, className, isError } = props;

  return <div className={isError ? `${s.alert} ${s.error}` : s.alert}>{children}</div>;
};

type PropsType = {
  children: ReactNode;
  className?: string;
  isError?: string;
};
