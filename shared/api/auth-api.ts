import type {
  ChangePasswordRequestType,
  ConfirmCodeRequestType,
  LoginRequestData,
  LoginResponse,
  PasswordRecoveryRequestType,
  SignUpRequestData,
  SignUpResponse,
} from '@/shared/types/auth.types';

import { accessTokenReceived } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // It's not working yet
    changePassword: builder.mutation<void, ChangePasswordRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: 'auth/change-password',
        };
      },
    }),
    confirmCode: builder.mutation<void, ConfirmCodeRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: 'auth/confirm-code',
        };
      },
    }),
    forgotPassword: builder.mutation<any, PasswordRecoveryRequestType>({
      query: params => {
        return {
          body: params,
          method: 'POST',
          url: 'auth/password-recovery-email',
        };
      },
    }),
    // Working (partially)
    login: builder.mutation<LoginResponse, LoginRequestData>({
      async onCacheEntryAdded(_arg, { cacheDataLoaded, dispatch, getCacheEntry }) {
        await cacheDataLoaded;
        const cacheEntry = getCacheEntry().data;

        if (cacheEntry) {
          dispatch(accessTokenReceived(cacheEntry.data.accessToken));
        }
      },
      query: arg => ({
        body: arg,
        // allow to set cross-site cookie 'refreshToken'
        credentials: 'include',
        method: 'POST',
        url: 'auth/login',
      }),
    }),
    // FIXME: Doesn't work for now. Execute app cleanup logic on log out.
    logout: builder.mutation<any, void>({
      query: () => 'auth/logout',
    }),
    refreshToken: builder.query<any, void>({
      query: () => ({
        // allow to send cross-site cookie 'refreshToken'
        credentials: 'include',
        url: 'auth/refresh-token',
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequestData>({
      query: body => {
        return {
          // FIXME: consider adding `credentials: "include"` to allow saving a new accessToken
          body,
          method: 'POST',
          url: 'auth/registration',
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
  useSignUpMutation,
} = authApi;
