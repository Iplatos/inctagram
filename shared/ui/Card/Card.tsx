import { ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './Card.module.scss';

export const Card = (props: PropsType) => {
  return <div className={clsx(s.component, props.className)}>{props.children}</div>;
};

type PropsType = {
  children: ReactNode;
  className?: string;
};
