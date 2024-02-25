import React from 'react';

import { AddProfilePhoto } from '@/features/accounts/edit';
import { ProfileForm } from '@/features/accounts/edit/profile-form/profile-form';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useChangeUserProfileMutation, useGetUserProfileQuery } from '@/shared/api/user.api';
import { ChangeProfileType } from '@/shared/types/user.types';

import style from './general-information.module.scss';

export const GeneralInformation = () => {
  const { data: me } = useGetMeQuery();

  const { data: profile, isLoading } = useGetUserProfileQuery(); //must sent me.id to api

  const [changeProfile] = useChangeUserProfileMutation();

  const onSubmitHandler = (generalInfo: ChangeProfileType) => {
    changeProfile(generalInfo);
  };

  return (
    <>
      <div className={style.container}>
        <AddProfilePhoto />

        <ProfileForm
          onSubmitChanges={onSubmitHandler}
          profile={profile}
          username={me && me.username}
        />
      </div>
    </>
  );
};
