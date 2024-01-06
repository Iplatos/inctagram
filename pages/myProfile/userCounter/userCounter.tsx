import s from './userCounter.module.scss';

type UserCounterType = {
  className?: string;
  count: number;
  text: string;
};
export const UserCounter = (props: UserCounterType) => {
  return (
    <div className={props.className}>
      <div className={s.userCounter}>{props.count} </div>
      <div className={s.userCounter}>{props.text} </div>
    </div>
  );
};
