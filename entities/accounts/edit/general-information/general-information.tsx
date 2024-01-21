import React from 'react';

import { AddProfilePhoto } from '@/features/accounts/edit';
import { ProfileForm } from '@/features/accounts/edit/profile-form/profile-form';

import style from './general-information.module.scss';

export const GeneralInformation = () => {
  return (
    <>
      <div className={style.container}>
        <AddProfilePhoto />

        <ProfileForm />
      </div>
    </>
  );
};
