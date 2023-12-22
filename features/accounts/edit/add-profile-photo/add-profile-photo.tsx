import React from 'react';

import { Button } from '@/shared/ui';
import Image from 'next/image';

import style from './add-profile-photo.module.scss';

import AccounPhotoImage from '../../../../assets/icons/account-photo.svg?url';

export const AddProfilePhoto = () => {
  function addProfilePhoto() {
    //open modal upload photo
  }

  return (
    <div className={style.photoContainer}>
      <div className={style.imageBlock}>
        <Image alt={'profile photo'} src={AccounPhotoImage} />
      </div>
      <Button onClick={addProfilePhoto} variant={'tertiary'}>
        Add a Profile Photo
      </Button>
    </div>
  );
};
