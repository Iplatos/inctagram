import { baseApi } from '@/pages/api/base-api';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<any, any>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/auth/me',
      }),
    }),
    login: builder.mutation<any, any>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: 'v1/auth/sign-up',
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useSignUpMutation } = authService;
