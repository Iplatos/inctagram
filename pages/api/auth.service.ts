import { baseApi } from '@/pages/api/base-api';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.query<any, any>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/api/v1/auth/registration',
      }),
    }),
  }),
});

export const { useLoginQuery } = authService;
