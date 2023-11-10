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
    /*   login: builder.mutation<any, any>({
         query: data => ({
           body: data,
           method: '',
           url: '/api/v1/auth/google',
         }),
       }),*/
  }),
});

export const { useGetMeQuery, useGoogleMutation, useLoginMutation } = authService;
