import { useState } from 'react';

import styles from './truncatedText.module.scss';

import { Button } from '../Button';

type HederProps = {
  text: string;
};

export const TruncatedText = ({ text }: HederProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <div className={`${styles.truncatedText} ${collapsed ? styles.collapsed : styles.expanded}`}>
        {text}
        <span className={`${styles.showMoreContainer} ${collapsed ? '' : styles.expanded}`}>
          <span className={`${styles.ellipsis} ${collapsed ? '' : styles.expanded}`}>
            {collapsed ? '...' : ' '}
          </span>

          <Button
            as={'a'}
            className={`${styles.button} ${collapsed ? '' : styles.expanded}`}
            onClick={() => setCollapsed(!collapsed)}
            variant={'tertiary'}
          >
            {collapsed ? 'Show more' : 'Hide'}
          </Button>
        </span>
      </div>
    </div>
  );
};
