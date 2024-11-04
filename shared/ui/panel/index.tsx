import { useId } from 'react';

import s from './panel.module.scss';

import { Typography } from '../typography';

type PanelProps = { usersCount: number | undefined };

export const Panel = (props: PanelProps) => {
  const id = useId();

  const items = [];

  if (props.usersCount) {
    for (let i = 1; i < 7 - props.usersCount.toString().length; i++) {
      items.push(
        <div className={s.panel} key={id}>
          <Typography.H2 className={s.cell}>{0}</Typography.H2>
          <div className={s.border}></div>
        </div>
      );
    }
  }

  return (
    <div className={s.container}>
      {props.usersCount && props.usersCount.toString().length < 5 && items
        ? items.map(item => item)
        : null}
      {Array.from(String(props.usersCount), el => (
        <div className={s.panel} key={id}>
          <Typography.H2 className={s.cell}>{el}</Typography.H2>
          <div className={s.border}></div>
        </div>
      ))}
    </div>
  );
};
