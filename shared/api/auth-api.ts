import type {
  ChangePasswordRequestType,
  ConfirmCodeRequestData,
  ConfirmCodeResponse,
  LoginRequestData,
  LoginResponse,
  LogoutResponse,
  PasswordRecoveryRequestType,
  RefreshTokenResponse,
  ResendConfirmationCodeRequest,
  SignUpRequestData,
  SignUpResponse,
} from '@/shared/types/auth.types';

import { accessTokenReceived, resetApp } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<void, ChangePasswordRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: 'auth/change-password',
        };
      },
    }),

    confirmCode: builder.mutation<ConfirmCodeResponse, ConfirmCodeRequestData>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/registration-confirmation',
        };
      },
    }),

    forgotPassword: builder.mutation<any, PasswordRecoveryRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/password-recovery',
        };
      },
    }),

    login: builder.mutation<LoginResponse, LoginRequestData>({
      invalidatesTags: ['Me', 'Auth'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(accessTokenReceived(data.accessToken));
        } catch (e) {
          console.error("Don't forget to handle async errors!", e);
        }
      },
      query: arg => ({
        body: arg,
        method: 'POST',
        url: '/api/v1/auth/login',
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      invalidatesTags: ['Auth', 'Me'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetApp());
        } catch (e) {
          console.error("Don't forget to handle async errors!", e);
        }
      },
      query: () => ({ method: 'POST', url: '/api/v1/auth/logout' }),
    }),

    refreshToken: builder.query<RefreshTokenResponse, void>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(accessTokenReceived(data.accessToken));
        } catch (e) {
          console.error("Don't forget to handle async errors!", e);
        }
      },
      providesTags: ['Auth'],
      query: () => {
        return { method: 'POST', url: '/api/v1/auth/update-tokens' };
      },
    }),
    resendConfirmCode: builder.mutation<ConfirmCodeResponse, ResendConfirmationCodeRequest>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: '/api/v1/auth/registration-email-resending',
        };
      },
    }),

    signUp: builder.mutation<SignUpResponse, SignUpRequestData>({
      query: body => {
        return {
          body,
          method: 'POST',
          url: '/api/v1/auth/registration',
        };
      },
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useConfirmCodeMutation,
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useResendConfirmCodeMutation,
  useSignUpMutation,
} = authApi;
