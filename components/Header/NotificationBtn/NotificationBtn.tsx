import Bell from '@/assets/icons/bell.svg';
import Image from 'next/image';

import styles from './NotificationBtn.module.scss';

export const NotificationBtn = ({ notifications }: { notifications: number }) => {
  return (
    <div className={styles['notifications-wrapper']}>
      <Image alt={'Notifications bell'} className={styles.notifications} src={Bell} />
      {notifications > 0 && <span>{notifications}</span>}
    </div>
  );
};
