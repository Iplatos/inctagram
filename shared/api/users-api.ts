import type {
  DeleteMyAvatarResponse,
  GetMeResponse,
  GetMyProfileResponse,
  UpdateMeRequestData,
  UpdateMeResponse,
} from '@/shared/types/user.types';

import { baseApi } from './base-api';

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteMyAvatar: builder.mutation<DeleteMyAvatarResponse, void>({
      invalidatesTags: ['Me', 'My-Profile'],
      query: () => ({
        method: 'DELETE',
        url: '/api/v1/users/profile/avatar',
      }),
    }),

    getMe: builder.query<GetMeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: '/api/v1/auth/me',
      }),
    }),

    getMyProfile: builder.query<GetMyProfileResponse, void>({
      providesTags: ['My-Profile'],
      query: () => '/api/v1/users/profile',
    }),

    getUserProfile: builder.query<any, string>({
      providesTags: ['Users-Profile'],
      query: userName => {
        return {
          url: `/api/v1/users/${userName}`,
        };
      },
    }),

    setMyAvatar: builder.mutation<any, FormData>({
      invalidatesTags: ['Me', 'My-Profile'],
      query: body => ({
        body,
        method: 'POST',
        url: '/api/v1/users/profile/avatar',
      }),
    }),

    updateMe: builder.mutation<UpdateMeResponse, UpdateMeRequestData>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'PUT',
        url: '/api/v1/users/profile',
      }),
    }),
  }),
});

const selectMyProfile = usersApi.endpoints.getMe.select();

export const {
  useDeleteMyAvatarMutation,
  useGetMeQuery,
  useGetMyProfileQuery,
  useLazyGetMeQuery,
  useLazyGetMyProfileQuery,
  useLazyGetUserProfileQuery,
  useSetMyAvatarMutation,
  useUpdateMeMutation,
} = usersApi;
