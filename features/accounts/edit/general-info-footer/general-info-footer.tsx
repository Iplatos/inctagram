import React from 'react';

import { Button } from '@/shared/ui';

import style from './general-info-footer.module.scss';

type FormIdType = {
  formId: string;
};

export const SaveChangesButton = (props: FormIdType) => {
  const { formId } = props;

  // const submitForm = e => {
  //   console.log(e.target.value);
  // };

  return (
    <div className={style.container}>
      <Button form={formId} type={'submit'} variant={'primary'}>
        Save Changes
      </Button>
    </div>
  );
};
