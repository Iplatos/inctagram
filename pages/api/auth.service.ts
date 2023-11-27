import { baseApi, getTokenFromLocalStorage } from '@/pages/api/base-api';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    confirmCode: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/confirm-code',
        };
      },
    }),
    getMe: builder.query<any, any>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/auth/me',
      }),
    }),
    login: builder.mutation<any, any>({
      query: data => ({
        body: data,
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/auth/logout',
      }),
    }),
    signUp: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/registration',
        };
      },
    }),
  }),
});

export const {
  useConfirmCodeMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
} = authService;
