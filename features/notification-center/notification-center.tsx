import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotificationInt, removeNotification } from '@/shared/api/notification-slice';
import { RootState } from '@/shared/api/store';
import { Toast } from '@/shared/ui/toast';

export const NotificationCenter = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  const dispatch = useDispatch();
  const [currentNotification, setCurrentNotification] = useState<NotificationInt | null>(
    notifications[0] || null
  );

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  useEffect(() => {
    if (currentNotification) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(currentNotification.id));
        setCurrentNotification(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentNotification, dispatch]);

  if (!currentNotification) {
    return null;
  }

  return (
    <Toast
      alertProps={{ severity: currentNotification.type }}
      message={currentNotification.message}
      onClose={() => setCurrentNotification(null)}
      open
    />
  );
};
