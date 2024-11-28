import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { AddProfilePhoto } from '@/features/accounts/edit';
import { FormValues, ProfileForm } from '@/features/accounts/edit/profile-form/profile-form';
import {
  useLazyGetMeQuery,
  useLazyGetMyProfileQuery,
  useUpdateMeMutation,
} from '@/shared/api/users-api';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import { GetMyProfileResponse, UpdateMeRequestData } from '@/shared/types/user.types';
import { Typography } from '@/shared/ui';

import style from './general-information.module.scss';

export const GeneralInformation = () => {
  const [getMe, { data: meResponse, isError }] = useLazyGetMeQuery();
  const [updateProfile] = useUpdateMeMutation();
  const [getMyProfile, { data, isError: isMyProfileError }] = useLazyGetMyProfileQuery();

  const isAuthSuccess = useAuthRedirect();

  useEffect(() => {
    if (isAuthSuccess) {
      getMe(undefined, true);
    }
  }, [isAuthSuccess, getMe]);

  useEffect(() => {
    if (meResponse) {
      getMyProfile();
    }
  }, [meResponse, getMyProfile]);

  if (isError || !meResponse || isMyProfileError) {
    return <Typography.H1>Profile loading error</Typography.H1>;
  }

  if (!data) {
    return null;
  }

  const handleSubmit: SubmitHandler<FormValues> = data => {
    const requestBody: UpdateMeRequestData = {
      aboutMe: data.aboutMe,
      city: data.city,
      country: data.country,
      dateOfBirth: data.dateOfBirth
        ? new DateObject({
            date: data.dateOfBirth,
            format: 'DD.MM.YYYY',
          }).format()
        : '',
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
    };

    return updateProfile(requestBody);
  };

  return (
    <div className={style.container}>
      <AddProfilePhoto />

      <ProfileForm defaultValues={mapUserProfileToFormValues(data)} onSubmit={handleSubmit} />
    </div>
  );
};

const mapUserProfileToFormValues = (profile: GetMyProfileResponse): FormValues => ({
  aboutMe: profile?.aboutMe ?? '',
  city: profile?.city ?? '',
  country: profile?.country ?? '',
  dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth) : null,
  firstName: profile?.firstName ?? '',
  lastName: profile?.lastName ?? '',
  userName: profile?.userName,
});
