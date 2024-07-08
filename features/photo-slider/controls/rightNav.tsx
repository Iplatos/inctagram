import React from 'react';

import Arrow from 'assets/icons/arrowRight.svg';

import style from './controls.module.scss';

import { NavProps } from './leftNav';

export const RightNav = React.memo((props: NavProps) => {
  const { disabled, onClick } = props;

  return (
    <button
      aria-label={'Previous Slide'}
      className={`image-gallery-icon image-gallery-right-nav ${style.button}`}
      disabled={disabled}
      onClick={onClick}
      style={{ marginRight: '12px' }}
      type={'button'}
    >
      <Arrow className={style.svg} />
    </button>
  );
});
