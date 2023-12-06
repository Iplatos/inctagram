import { baseApi, getTokenFromLocalStorage } from '@/shared/api/base-api';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/change-password',
        };
      },
    }),
    confirmCode: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/confirm-code',
        };
      },
    }),
    forgotPassword: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/password-recovery-email',
        };
      },
    }),
    getMe: builder.query<any, void>({
      extraOptions: { maxRetries: 0 },
      providesTags: ['Me'],
      // @ts-ignore
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          method: 'GET',
          url: '/api/v1/auth/me',
        });

        if (result.error) {
          return { data: { success: false } };
        }

        return { data: result.data };
      },
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
    uploadPhoto: builder.mutation<any, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/avatar/upload',
        };
      },
    }),
  }),
});

export const {
  useConfirmCodeMutation,
  useForgotPasswordMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useUploadPhotoMutation,
} = authService;
