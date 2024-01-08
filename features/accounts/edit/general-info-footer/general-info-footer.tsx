import React from 'react';

import { Button } from '@/shared/ui';

import style from './general-info-footer.module.scss';

export const SaveChangesButton = () => {
  // const submitForm = e => {
  //   console.log(e.target.value);
  // };

  return (
    <div className={style.container}>
      <Button form={'generalInformation'} type={'submit'} variant={'primary'}>
        Save Changes
      </Button>
    </div>
  );
};
