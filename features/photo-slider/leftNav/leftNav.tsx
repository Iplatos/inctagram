import React, { MouseEventHandler } from 'react';

import style from './leftNav.module.scss';

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
      // style={{ background: 'lightgrey', height: '48px', width: '48px' }}
      type={'button'}
    >
      &#8678;
    </button>
  );
});
