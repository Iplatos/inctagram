import React from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import Image from 'next/image';

import style from './add-profile-photo.module.scss';

import AccountPhotoImage from '../../../../assets/icons/avatar-fallback.svg?url';

export const AddProfilePhoto = () => {
  const { addProfilePhoto: t } = useTranslation().t.generalInformation;

  function addProfilePhoto() {
    //open modal upload photo
  }

  return (
    <div className={style.photoContainer}>
      <div className={style.imageBlock}>
        <Image alt={'profile photo'} src={AccountPhotoImage} />
      </div>
      <Button onClick={addProfilePhoto} variant={'tertiary'}>
        {t.submitButton}
      </Button>
    </div>
  );
};
