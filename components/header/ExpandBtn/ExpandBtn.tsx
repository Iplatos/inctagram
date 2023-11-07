import Expand from '@/assets/icons/3dots.svg';
import Image from 'next/image';

import styles from './ExpandBtn.module.scss';

export const ExpandBtn = () => {
  return (
    <div className={styles.wrapper}>
      <Image alt={'Expand button'} src={Expand} />
    </div>
  );
};
