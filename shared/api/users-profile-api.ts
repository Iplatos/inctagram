import { baseApi } from '@/shared/api/base-api';

export const UsersProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<any, void>({
      providesTags: ['My-Profile'],
      query: () => '/api/v1/users/profile',
    }),

    getUsersProfile: builder.query<any, string>({
      providesTags: ['Users-Profile'],
      query: userName => {
        return {
          url: `/api/v1/users/${userName}`,
        };
      },
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useGetUsersProfileQuery,
  useLazyGetMyProfileQuery,
  useLazyGetUsersProfileQuery,
} = UsersProfileApi;
