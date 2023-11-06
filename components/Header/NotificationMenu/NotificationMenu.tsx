import type { Notification } from '../Header';

import { useState } from 'react';

import OutlinedBell from '@/assets/icons/bell.svg';
import DropdownArrow from '@/assets/icons/dropdown-arrow.svg';
import FilledBell from '@/assets/icons/filled-bell.svg';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

import styles from './NotificationMenu.module.scss';

export const NotificationMenu = ({ notifications }: { notifications: Notification[] }) => {
  const [open, setOpen] = useState(false);
  const hanldeOpen = () => setOpen(!open);
  const showSpan = notifications.length && !open;
  const { t } = useTranslation();

  return (
    <DropdownMenu.Root onOpenChange={hanldeOpen} open={open}>
      <DropdownMenu.Trigger asChild>
        <button aria-label={'Notifications button'} className={styles.DropdownMenuButton}>
          <Image
            alt={'Notifications bell'}
            className={styles.notifications}
            src={open ? FilledBell : OutlinedBell}
          />
          {showSpan && <span>{notifications.length < 10 ? notifications.length : '9+'}</span>}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align={'end'}
        alignOffset={-12}
        className={styles.DropdownMenuContent}
        sideOffset={6}
      >
        <DropdownMenu.Item>{t.notificationMenu.notifications}</DropdownMenu.Item>
        {notifications.map(notification => (
          <div key={notification.id}>
            <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <div>
                <Typography.Bold14>{t.notificationMenu.newNotification}</Typography.Bold14>
                {notification.isNew && (
                  <span className={styles.NewNotification}>{t.notificationMenu.new}</span>
                )}
              </div>
              <span className={styles.NotificationMessage}>{notification.message}</span>
              <div className={styles.NotificationDate}>
                {notification.notificationTime} {t.notificationMenu.ago}
              </div>
            </DropdownMenu.Item>
          </div>
        ))}
        <Image alt={'Dropdown arrow'} className={styles.DropdownMenuArrow} src={DropdownArrow} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
