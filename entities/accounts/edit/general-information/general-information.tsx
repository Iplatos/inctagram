import React from 'react';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { AddProfilePhoto } from '@/features/accounts/edit';
import { FormValues, ProfileForm } from '@/features/accounts/edit/profile-form/profile-form';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@/shared/api/user.api';
import { UpdateProfileType } from '@/shared/types/user.types';

import style from './general-information.module.scss';

export const GeneralInformation = () => {
  const [updateProfile, { error: updateProfileError }] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<FormValues> = data => {
    const dateOfBirth = data.dateOfBirth
      ? new DateObject({
          date: data.dateOfBirth,
          format: 'DD.MM.YYYY',
        }).format()
      : '';

    updateProfile({ ...data, dateOfBirth });
  };

  const onSubmitError: SubmitErrorHandler<FormValues> = data => {};

  return (
    <>
      <div className={style.container}>
        <AddProfilePhoto />

        <ProfileForm onSubmit={onSubmit} onSubmitError={onSubmitError} />
      </div>
    </>
  );
};
