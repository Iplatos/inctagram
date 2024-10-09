import { ReactNode } from 'react';

import s from './header.module.scss';

type Props = {
  children?: ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <div className={s.container}>
      <header className={s.content}>{children}</header>
    </div>
  );
};
