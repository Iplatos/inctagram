import React, { useState } from 'react';

import { Button } from '@/shared/ui';
import Image from 'next/image';

import style from './add-profile-photo.module.scss';

import AccountPhotoImage from '../../../../assets/icons/account-photo.svg?url';
import { AddPhoto } from '@/features/addPhoto/addPhoto';

export const AddProfilePhoto = () => {
  function addProfilePhoto() {
    //open modal upload photo
  }

  return (
    <>
      <div className={style.photoContainer}>
        <div className={style.imageBlock}>
          <Image alt={'profile photo'} src={AccountPhotoImage} />
        </div>
        <Button onClick={addProfilePhoto} variant={'tertiary'}>
          Add a Profile Photo
        </Button>
      </div>

      {/* <AddPhoto /> */}
    </>
  );
};
