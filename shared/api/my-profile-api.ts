import { baseApi } from '@/shared/api/base-api';

export const ProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<any, any>({
      providesTags: ['My-Profile'],
      query: () => '/api/v1/users/profile',
    }),
  }),
});
