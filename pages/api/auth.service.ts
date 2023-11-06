import { baseApi } from '@/pages/api/base-api';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<any, any>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/users',
      }),
    }),
    login: builder.mutation<any, any>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation } = authService;
