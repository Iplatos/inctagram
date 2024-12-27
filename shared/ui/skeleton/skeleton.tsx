import { clsx } from 'clsx';

type Props = {
  borderRadius?: number | string;
  className?: string;
  height?: number | string;
  variant?: 'circle' | 'square';
  width?: number | string;
};

import s from './skeleton.module.scss';

export const Skeleton = (props: Props) => {
  const { borderRadius, className, height, variant = 'square', width } = props;

  const style = {
    borderRadius,
    height,
    width,
  };

  return <span className={clsx(s.skeleton, s[variant], className)} style={style}></span>;
};
