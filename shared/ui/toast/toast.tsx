import React, { PropsWithChildren, forwardRef, useEffect, useRef, useState } from 'react';

import { useEffectEvent } from '@/shared/hooks/useEffectEvent';
import { Alert, AlertProps, AlertSlot } from '@/shared/ui/alert';
import { clsx } from 'clsx';

import s from './toast.module.scss';

type ToastSlot = 'toastRoot' | AlertSlot;
export type ToastClasses = { [P in ToastSlot]?: string };

export type ToastProps = PropsWithChildren<{
  alertProps?: Pick<AlertProps, 'action' | 'severity'>;
  autoCloseDelay?: null | number;
  classes?: ToastClasses;
  message?: string;
  onClose?: (reason: 'autoCloseTimeout' | 'closeButtonClick' | 'unknown') => void;
  open: boolean;
}>;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    { alertProps = {}, autoCloseDelay = 6000, children, classes = {}, message = '', onClose, open },
    ref
  ) => {
    // toastState is used to ensure that the 'open' prop is only changed after 'onClose' has been called
    const [toastState, setToastState] = useState<'closed' | 'opened'>('closed');
    const timerRef = useRef<number>();

    const attemptToClose = useEffectEvent(
      (reason: 'autoCloseTimeout' | 'closeButtonClick' | 'unknown') => {
        setToastState('closed');
        onClose?.(reason);
        clearTimeout(timerRef.current);
      }
    );

    useEffect(() => {
      if (open && autoCloseDelay !== null) {
        timerRef.current = window.setTimeout(
          () => attemptToClose('autoCloseTimeout'),
          autoCloseDelay
        );
        setToastState('opened');
      }

      return () => {
        clearTimeout(timerRef.current);
      };
    }, [attemptToClose, autoCloseDelay, open]);

    if (!open) {
      // toast has been closed by changing the 'open' prop from the parent
      // without waiting for 'onClose' to be triggered.
      if (toastState === 'opened') {
        attemptToClose('unknown');
      }

      return null;
    }

    const cls = getClassNames(classes);

    return (
      <div className={cls.toastRoot} data-test-id={'toast'} ref={ref}>
        {children ?? (
          <Alert classes={cls} onClose={() => attemptToClose('closeButtonClick')} {...alertProps}>
            {message}
          </Alert>
        )}
      </div>
    );
  }
);

const getClassNames = (classes: ToastClasses): ToastClasses => ({
  action: clsx(s.action, classes.action),
  alertRoot: clsx(s.alertRoot, classes.alertRoot),
  close: clsx(s.close, classes.close),
  message: clsx(s.message, classes.message),
  toastRoot: clsx(s.toastRoot, classes.toastRoot),
});
