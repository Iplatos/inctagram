import { NotificationType } from '@/shared/api/socket-api/socket-api.types';
import { useRelativeTime, useTranslation } from '@/shared/hooks';
import { Typography } from '@/shared/ui';

import s from './notification.module.scss';

interface Props extends NotificationType {}

export const Notification = (props: Props) => {
  const { isRead, message, notifyAt } = props;
  const relativeTimeString = useRelativeTime(notifyAt);
  const t = useTranslation().t.notificationMenu;

  return (
    <div className={s.notification}>
      <div className={s.notificationLabel}>
        <Typography.Bold14>{t.newNotification}</Typography.Bold14>
        {isRead && <Typography.SmallText className={s.status}>{t.new}</Typography.SmallText>}
      </div>
      <Typography.Regular14>{message}</Typography.Regular14>
      <Typography.SmallText className={s.notificationDate}>
        {relativeTimeString}
      </Typography.SmallText>
    </div>
  );
};
