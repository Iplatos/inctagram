import { ChangeProfileType, UserProfileType } from '../types/user.types';
import { baseApi } from './base-api';

export const userApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      changeUserProfile: build.mutation<any, ChangeProfileType>({
        query: userInfo => {
          return {
            body: {
              userInfo,
            },
            method: 'PUT',
            url: '/api/v1/user/profile',
          };
        },
      }),
      getUserProfile: build.query<UserProfileType, void>({
        query: () => {
          return {
            method: 'GET',
            url: '/api/v1/user/profile',
          };
        },
      }),
    };
  },
});

export const { useChangeUserProfileMutation, useGetUserProfileQuery } = userApi;
