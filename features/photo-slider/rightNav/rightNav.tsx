import React, { MouseEventHandler } from 'react';

import style from './rightNav.module.scss';

import { NavProps } from '../leftNav/leftNav';

export const RightNav = React.memo((props: NavProps) => {
  const { disabled, onClick } = props;

  return (
    <button
      aria-label={'Previous Slide'}
      className={`image-gallery-icon image-gallery-right-nav ${style.button}`}
      disabled={disabled}
      onClick={onClick}
      // style={{ background: 'lightgrey', height: '48px', width: '48px' }}
      type={'button'}
    >
      &#8680;
    </button>
  );
});
