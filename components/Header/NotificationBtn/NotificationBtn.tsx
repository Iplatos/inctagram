import Image from 'next/image';
import Bell from '@/public/icons/Bell.svg';
import styles from './NotificationBtn.module.scss';

export const NotificationBtn = ({ notifications }: { notifications: number }) => {
  return (
    <div className={styles['notifications-wrapper']}>
      <Image src={Bell} alt="Notifications bell" className={styles.notifications} />
      {notifications > 0 && <span>{notifications}</span>}
    </div>
  );
};
