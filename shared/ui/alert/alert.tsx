import React, {
  ElementRef,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  forwardRef,
} from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { capitalise } from '@/shared/helpers/capitalise';

import s from './alert.module.scss';

// TODO: add classes feature
type AlertProps = PropsWithChildren<{
  action?: ReactElement;
  onClose?: (event: SyntheticEvent) => void;
  severity: 'error' | 'success';
}>;

export const Alert = forwardRef<ElementRef<'div'>, AlertProps>(
  ({ action, children, onClose, severity }, ref) => {
    const resolvedAction = action ?? (
      <button className={s[`close${capitalise(severity)}`]} onClick={e => onClose?.(e)}>
        <CloseIcon />
      </button>
    );
    // Only show the action if either onClose or action prop is specified, or both.
    const showAction = onClose ?? action;

    return (
      <div className={s[severity]} ref={ref}>
        <div className={s.message}>{children}</div>
        <div className={s.action}>{showAction && resolvedAction}</div>
      </div>
    );
  }
);
