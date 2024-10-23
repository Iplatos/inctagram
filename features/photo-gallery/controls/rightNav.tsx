import React from 'react';

import { ArrowRight } from '@/assets/icons/arrow-right';

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
      <ArrowRight className={style.svg} />
    </button>
  );
});
