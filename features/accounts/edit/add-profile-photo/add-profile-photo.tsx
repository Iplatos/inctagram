import React, { useState } from 'react';

import Image from 'next/image';

import style from './add-profile-photo.module.scss';

import AccountPhotoImage from '../../../../assets/icons/account-photo.svg?url';
import { AddPhoto } from '../../../addPhoto/addPhoto';

export const AddProfilePhoto = () => {
  return (
    <div className={style.photoContainer}>
      <div className={style.imageBlock}>
        <Image alt={'profile photo'} src={AccountPhotoImage} />
      </div>

      <AddPhoto />
    </div>
  );
};
