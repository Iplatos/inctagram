import type {
  DeleteMyAvatarResponse,
  GetMeResponse,
  UpdateMeRequestData,
  UpdateMeResponse,
} from '@/shared/types/user.types';

import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { baseApi } from './base-api';

// The `baseQuery` instance required to retrieve the user's avatar file. Used for convenience instead of native `fetch`.
const customBaseQuery = fetchBaseQuery({
  baseUrl: '/',
  responseHandler: res => res.arrayBuffer(),
});

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
    // downloading the user's avatar file for re-uploading if the user wants to use the same image but with different cropping props.

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
  useLazyGetMeQuery,
  useSetMyAvatarMutation,
  useUpdateMeMutation,
} = usersApi;
