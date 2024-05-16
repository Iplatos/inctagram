import { MeResponse, UpdateMeRequestData, UpdateMeResponse } from '@/shared/types/user.types';
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
    me: builder.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        subdomain: 'read',
        url: 'users/me',
      }),
    }),
    myAvatarBase64: builder.query<null | string, void>({
      queryFn: async (_arg, api, extraOptions) => {
        const { data: meResponse } = selectMyProfile(api.getState() as RootState);
        const avatarUrl = meResponse?.data.avatar?.url;

        if (!avatarUrl) {
          return { data: null };
        }

        const { data, error } = await customBaseQuery(
          `https://corsproxy.io?${avatarUrl}`,
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
    setAvatar: builder.mutation<any, FormData>({
      invalidatesTags: ['Me'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const avatar = arg.get('file') as File;
          const avatarBase64 = await blobToBase64(avatar);

          dispatch(usersApi.util.upsertQueryData('myAvatarBase64', undefined, avatarBase64));
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
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'PUT',
        url: 'users/profile',
      }),
    }),
  }),
});

const selectMyProfile = usersApi.endpoints.me.select();

export const {
  useLazyMeQuery,
  useLazyMyAvatarBase64Query,
  useMeQuery,
  useSetAvatarMutation,
  useUpdateMeMutation,
} = usersApi;
