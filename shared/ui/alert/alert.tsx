import React, { ElementRef, PropsWithChildren, ReactElement, forwardRef } from 'react';

import { CloseIcon } from '@/assets/icons/close';
import { capitalise } from '@/shared/helpers/capitalise';
import { clsx } from 'clsx';

import s from './alert.module.scss';

export type AlertSeverity = 'error' | 'success';
export type AlertSlot = 'action' | 'alertRoot' | 'close' | 'message';
export type AlertClasses = { [P in AlertSlot]?: string };

export type AlertProps = PropsWithChildren<{
  action?: ReactElement;
  classes?: AlertClasses;
  onClose?: () => void;
  severity?: AlertSeverity;
}>;

export const Alert = forwardRef<ElementRef<'div'>, AlertProps>(
  ({ action, children, classes = {}, onClose, severity = 'success' }, ref) => {
    const cls = getClassNames(classes, severity);

    const resolvedAction = action ?? (
      <button className={cls.close} onClick={() => onClose?.()}>
        <CloseIcon />
      </button>
    );
    // Only show the action if either onClose or action prop is specified, or both.
    const showAction = onClose ?? action;

    return (
      <div className={cls.alertRoot} data-test-id={'alert'} ref={ref}>
        <div className={cls.message} data-test-id={'message'}>
          {children}
        </div>
        {showAction && (
          <div className={cls.action} data-test-id={'action'}>
            {resolvedAction}
          </div>
        )}
      </div>
    );
  }
);

const getClassNames = (classes: AlertClasses, severity: AlertSeverity): AlertClasses => ({
  action: clsx(s.action, classes.action),
  alertRoot: clsx(s[`alertRoot${capitalise(severity)}`], classes.alertRoot),
  close: clsx(s[`close${capitalise(severity)}`], classes.close),
  message: clsx(s.message, classes.message),
});
