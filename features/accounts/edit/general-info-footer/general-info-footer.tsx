import React from 'react';

import { Button } from '@/shared/ui';

import style from './general-info-footer.module.scss';

export const SaveChangesButton = () => {
  return (
    <div className={style.container}>
      <Button form={'generalInformation'} type={'submit'} variant={'primary'} disabled>
        Save Changes
      </Button>
    </div>
  );
};
