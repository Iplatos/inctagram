import { useState } from 'react';

import { BellIcon } from '@/assets/icons/bell';
import { BellFilledIcon } from '@/assets/icons/bell-filled';
import { Notification } from '@/features/notifications/notification/Notification';
import useWebSocket from '@/shared/api/socket-api/socket-api';
import { useTranslation } from '@/shared/hooks';
import { IconButton, Typography } from '@/shared/ui';
import { DropDown } from '@/shared/ui/drop-down-menu';

import s from './notifications.module.scss';

interface NotificationType {
  clientId: string;
  id: number;
  isRead: boolean;
  message: string;
  notifyAt: string;
}

const testData = [
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: true,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: true,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: false,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: false,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: false,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
  {
    clientId: '5056ccae-a601-4e4c-86da-414cad3ef748',
    id: 1,
    isRead: true,
    message: 'Your notifications notification here',
    notifyAt: '2024-12-02T10:51:22.589Z',
  },
];

export const Notifications = () => {
  const { notifications: initialNotification } = useWebSocket();
  const [notifications, setNotifications] = useState<NotificationType[]>(testData);
  const [open, setOpen] = useState(false);

  const t = useTranslation().t.notificationMenu;

  const notVisibleCount = notifications.filter(n => !n.isRead).length;

  const trigger = () => (
    <div className={s.trigger}>
      <IconButton>{open ? <BellFilledIcon /> : <BellIcon />}</IconButton>
      {notifications.length !== 0 && (
        <Typography.SmallText className={s.notVisibleCount}>
          {notVisibleCount > 10 ? '9+' : notVisibleCount}
        </Typography.SmallText>
      )}
    </div>
  );

  return (
    <DropDown.Menu
      align={'end'}
      className={s.notificationMenu}
      onOpenChange={setOpen}
      open={open}
      trigger={trigger()}
    >
      <div className={s.label}>
        <Typography.Medium16>{t.notifications}</Typography.Medium16>
      </div>
      <DropDown.Separator />

      {notifications.length > 0 ? (
        <div className={s.notificationsList}>
          {notifications.map((notification, index) => (
            <>
              <DropDown.Item className={s.notificationItem} key={index}>
                <Notification {...notification} />
              </DropDown.Item>
              {notifications.length - 1 !== index && <DropDown.Separator />}
            </>
          ))}
        </div>
      ) : (
        <DropDown.Item className={s.notNotificationLabel}>
          <div>No new notifications!</div>
        </DropDown.Item>
      )}
    </DropDown.Menu>
  );
};
