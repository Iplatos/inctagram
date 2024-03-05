import React, { useState } from 'react';

import { AddPhoto } from '@/features/addPhoto/addPhoto';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import Image from 'next/image';

import style from './add-profile-photo.module.scss';

import AccountPhotoImage from '../../../../assets/icons/account-photo.svg?url';

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
