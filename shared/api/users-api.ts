import type {
  MeResponse,
  SetAvatarResponse,
  UpdateMeRequestData,
  UpdateMeResponse,
} from '@/shared/types/user.types';

import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { blobToBase64 } from '../helpers';
import { bufferToBase64 } from '../helpers/bufferToBase64';
import { baseApi } from './base-api';
import { RootState } from './store';

// The `baseQuery` instance required to retrieve the user's avatar file. Used for convenience instead of native `fetch`.
const customBaseQuery = fetchBaseQuery({
  baseUrl: '/',
  responseHandler: res => res.arrayBuffer(),
});

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<MeResponse, void>({
      providesTags: [{ id: 'USER_DATA', type: 'Me' }],
      query: () => ({
        subdomain: 'read',
        url: 'users/me',
      }),
    }),
    getMyAvatarBase64: builder.query<null | string, void>({
      providesTags: [{ id: 'AVATAR64', type: 'Me' }],
      queryFn: async (_arg, api, extraOptions) => {
        const { data: meResponse } = selectMyProfile(api.getState() as RootState);
        const avatarUrl = meResponse?.data.avatar?.url;

        if (!avatarUrl) {
          return { data: null };
        }

        const { data, error } = await customBaseQuery(
          {
            url: `https://corsproxy.io?${avatarUrl}`,
            // headers: { 'x-cors-api-key': 'temp_5f7968c43e0954ac6b88dd08460b7d1d' },
            // url: `https://proxy.cors.sh/${avatarUrl}`,
          },
          api,
          extraOptions
        );

        // The file is not serializable, so base64 is passed to the cache
        if (data instanceof ArrayBuffer) {
          return { data: 'data:image/jpeg;base64,' + bufferToBase64(data) };
        }

        const resolvedError = error
          ? { error }
          : {
              error: {
                data,
                error: 'Failed attempt at transforming the response body to base64.',
                status: 'CUSTOM_ERROR',
              } as const,
            };

        console.error(resolvedError);

        return resolvedError;
      },
    }),
    setMyAvatar: builder.mutation<SetAvatarResponse, FormData>({
      invalidatesTags: [{ id: 'USER_DATA', type: 'Me' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const avatar = arg.get('file') as File;
          const avatarBase64 = await blobToBase64(avatar);

          dispatch(usersApi.util.upsertQueryData('getMyAvatarBase64', undefined, avatarBase64));
        } catch (e) {
          console.log("Don't forget to handle async errors!", e);
        }
      },
      query: body => ({
        body,
        method: 'POST',
        subdomain: 'files',
        url: 'users/avatar',
      }),
    }),
    updateMe: builder.mutation<UpdateMeResponse, UpdateMeRequestData>({
      invalidatesTags: [{ id: 'USER_DATA', type: 'Me' }],
      query: body => ({
        body,
        method: 'PUT',
        url: 'users/profile',
      }),
    }),
  }),
});

const selectMyProfile = usersApi.endpoints.getMe.select();

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useLazyGetMyAvatarBase64Query,
  useSetMyAvatarMutation,
  useUpdateMeMutation,
} = usersApi;
