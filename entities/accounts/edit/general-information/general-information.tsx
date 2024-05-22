import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DateObject } from 'react-multi-date-picker';

import { AddProfilePhoto } from '@/features/accounts/edit';
import { FormValues, ProfileForm } from '@/features/accounts/edit/profile-form/profile-form';
import { useLazyGetMeQuery, useUpdateMeMutation } from '@/shared/api/users-api';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import { UpdateMeRequestData, UserProfile } from '@/shared/types/user.types';
import { Typography } from '@/shared/ui';

import style from './general-information.module.scss';

export const GeneralInformation = () => {
  const [getMyProfile, { data: meResponse, isError }] = useLazyGetMeQuery();
  const [updateProfile] = useUpdateMeMutation();

  const isAuthSuccess = useAuthRedirect();

  useEffect(() => {
    if (isAuthSuccess) {
      getMyProfile(undefined, true);
    }
  }, [isAuthSuccess, getMyProfile]);

  if (isError || !meResponse) {
    return <Typography.H1>Profile loading error</Typography.H1>;
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
        : undefined,
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.userName,
    };

    return updateProfile(requestBody);
  };

  return (
    <div className={style.container}>
      <AddProfilePhoto />

      <ProfileForm
        defaultValues={mapUserProfileToFormValues(meResponse.data)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

const mapUserProfileToFormValues = (profile: UserProfile): FormValues => ({
  aboutMe: profile.aboutMe ?? '',
  city: profile.city ?? '',
  country: profile.country ?? '',
  dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
  firstName: profile.firstname ?? '',
  lastName: profile.lastname ?? '',
  userName: profile.username,
});
