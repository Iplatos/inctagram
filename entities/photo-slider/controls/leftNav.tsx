import React, { MouseEventHandler } from 'react';

import Arrow from 'assets/icons/arrowLeft.svg';

import style from './controls.module.scss';

export type NavProps = {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLElement>;
};

export const LeftNav = React.memo((props: NavProps) => {
  const { disabled, onClick } = props;

  return (
    <button
      aria-label={'Previous Slide'}
      className={`image-gallery-icon image-gallery-left-nav ${style.button}`}
      disabled={disabled}
      onClick={onClick}
      style={{ marginLeft: '12px' }}
      type={'button'}
    >
      <Arrow className={style.svg} />
    </button>
  );
});
