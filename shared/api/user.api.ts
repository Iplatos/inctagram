import { UpdateProfileType, UserProfileType } from '../types/user.types';
import { baseApi } from './base-api';

export const userApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getUserProfile: build.query<UserProfileType, void>({
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/user/profile',
          };
        },
      }),
      updateProfile: build.mutation<any, UpdateProfileType>({
        query: ({ firstName, lastName, userName, ...user }) => {
          return {
            body: {
              ...user,
              firstname: firstName,
              lastname: lastName,
              username: userName,
            },
            method: 'PUT',
            url: '/api/v1/user/profile',
          };
        },
      }),
    };
  },
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery, useUpdateProfileMutation } =
  userApi;
