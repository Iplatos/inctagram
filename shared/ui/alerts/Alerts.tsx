import { ReactNode } from 'react';

import s from './Alerts.module.scss';

export const Alerts = (props: PropsType) => {
  const { children, className, isError } = props;

  console.log(`${s.alert} ${s.error}`);

  return <div className={isError ? `${s.alert} ${s.error}` : s.alert}>{children}</div>;
};

type PropsType = {
  children: ReactNode;
  className?: string;
  isError?: boolean;
};
