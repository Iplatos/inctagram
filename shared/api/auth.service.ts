import { baseApi, getTokenFromLocalStorage } from '@/shared/api/base-api';
import {
  ChangePasswordRequestType,
  ConfirmCodeRequestType,
  LoginRequestType,
  LoginResponseType,
  MeResponseType,
  PasswordRecoveryRequestType,
  SignUpRequestType,
  UploadPhotoResponseType,
} from '@/shared/types/auth.types';

const authService = baseApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<void, ChangePasswordRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/change-password',
        };
      },
    }),
    confirmCode: builder.mutation<void, ConfirmCodeRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/confirm-code',
        };
      },
    }),
    forgotPassword: builder.mutation<any, PasswordRecoveryRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/password-recovery-email',
        };
      },
    }),
    getMe: builder.query<MeResponseType, void>({
      providesTags: ['Me'],
      query: () => `/api/v1/auth/me`,
    }),
    login: builder.mutation<LoginResponseType, LoginRequestType>({
      invalidatesTags: ['Me'],
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
      onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
        try {
          await queryFulfilled;

          /*     dispatch(
                 baseApi.util.updateQueryData('getMe', undefined, () => {
                   return {};
                 })
               );*/
        } catch (e) {
          console.log(e);
        }
      },
      query: () => ({
        method: 'GET',
        url: '/api/v1/auth/logout',
      }),
    }),
    signUp: builder.mutation<SignUpRequestType, any>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/registration',
        };
      },
    }),
    uploadPhoto: builder.mutation<UploadPhotoResponseType, any>({
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
  useChangePasswordMutation,
  useConfirmCodeMutation,
  useForgotPasswordMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useUploadPhotoMutation,
} = authService;
