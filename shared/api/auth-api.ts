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
import { addNotification } from '@/shared/api/notification-slice';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    changePassword: builder.mutation<void, ChangePasswordRequestType>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addNotification({ message: 'Password changed successfully!', type: 'success' }));
        } catch (e) {
          dispatch(
            addNotification({
              message: 'Failed to change password. Please try again.',
              type: 'error',
            })
          );
        }
      },
      query: params => ({
        body: params,
        method: 'POST',
        url: 'auth/change-password',
      }),
    }),

    confirmCode: builder.mutation<ConfirmCodeResponse, ConfirmCodeRequestData>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addNotification({ message: 'Code confirmed successfully!', type: 'success' }));
        } catch (e) {
          dispatch(
            addNotification({ message: 'Failed to confirm code. Please try again.', type: 'error' })
          );
        }
      },
      query: params => ({
        body: params,
        method: 'POST',
        url: '/api/v1/auth/registration-confirmation',
      }),
    }),

    forgotPassword: builder.mutation<void, PasswordRecoveryRequestType>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addNotification({ message: 'Password recovery email sent!', type: 'success' }));
        } catch (e) {
          dispatch(
            addNotification({
              message: 'Failed to send recovery email. Please try again.',
              type: 'error',
            })
          );
        }
      },
      query: params => ({
        body: params,
        method: 'POST',
        url: '/api/v1/auth/password-recovery',
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequestData>({
      invalidatesTags: ['Me', 'Auth'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(accessTokenReceived(data.accessToken));
          dispatch(addNotification({ message: 'Login successful!', type: 'success' }));
        } catch (e) {
          dispatch(addNotification({ message: 'Login failed. Please try again.', type: 'error' }));
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
          dispatch(addNotification({ message: 'Logout successful!', type: 'success' }));
        } catch (e) {
          dispatch(addNotification({ message: 'Logout failed. Please try again.', type: 'error' }));
        }
      },
      query: () => ({
        method: 'POST',
        url: '/api/v1/auth/logout',
      }),
    }),

    refreshToken: builder.query<RefreshTokenResponse, void>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(accessTokenReceived(data.accessToken));
        } catch (e) {
          dispatch(
            addNotification({
              message: 'Failed to refresh token. Please try again.',
              type: 'error',
            })
          );
        }
      },
      providesTags: ['Auth'],
      query: () => ({
        method: 'POST',
        url: '/api/v1/auth/update-tokens',
      }),
    }),

    resendConfirmCode: builder.mutation<ConfirmCodeResponse, ResendConfirmationCodeRequest>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            addNotification({ message: 'Confirmation code resent successfully!', type: 'success' })
          );
        } catch (e) {
          dispatch(
            addNotification({
              message: 'Failed to resend confirmation code. Please try again.',
              type: 'error',
            })
          );
        }
      },
      query: params => ({
        body: params,
        method: 'POST',
        url: '/api/v1/auth/registration-email-resending',
      }),
    }),

    signUp: builder.mutation<SignUpResponse, SignUpRequestData>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addNotification({ message: 'Sign up successful!', type: 'success' }));
        } catch (e) {
          dispatch(
            addNotification({ message: 'Failed to sign up. Please try again.', type: 'error' })
          );
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/api/v1/auth/registration',
      }),
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
