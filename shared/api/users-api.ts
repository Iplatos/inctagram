import type {
  deleteMyAvatarResponse as DeleteMyAvatarResponse,
  GetMeResponse,
  SetMyAvatarResponse,
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
    deleteMyAvatar: builder.mutation<DeleteMyAvatarResponse, void>({
      invalidatesTags: ['Me'],
      async queryFn(_arg, { getState }, _extraOptions, baseQuery) {
        const { data: meResponse } = selectMyProfile(getState() as RootState);
        const avatarId = meResponse?.data.avatar?.id;

        if (!avatarId) {
          const error =
            'Request to delete user avatar failed due to missing avatar id in user data in redux cache';

          console.error(error);

          return {
            error: {
              error,
              status: 'CUSTOM_ERROR',
            },
          };
        }

        const { data, error, meta } = await baseQuery({
          method: 'DELETE',
          subdomain: 'files',
          url: `users/avatar/${avatarId}`,
        });

        return error ? { error, meta } : { data: data as DeleteMyAvatarResponse, meta };
      },
    }),
    getMe: builder.query<GetMeResponse, void>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(usersApi.endpoints.refetchMyAvatarBase64.initiate());
        } catch (e) {
          console.error('Don"t forget to handle async errors!', e);
        }
      },
      providesTags: ['Me'],
      query: () => ({
        subdomain: 'read',
        url: 'users/me',
      }),
    }),
    // downloading the user's avatar file for re-uploading if the user wants to use the same image but with different cropping props.
    getMyAvatarBase64: builder.query<null | string, void>({
      providesTags: ['MyAvatarBase64'],
      async queryFn(_arg, api, extraOptions) {
        const { data: meResponse } = selectMyProfile(api.getState() as RootState);
        const avatarUrl = meResponse?.data.avatar?.url;

        if (!avatarUrl) {
          return { data: null };
        }

        const { data, error, meta } = await customBaseQuery(
          { url: `https://corsproxy.io?${avatarUrl}` },
          api,
          extraOptions
        );

        // The `File` instance is not serializable, so `base64` string is passed to the cache
        if (data instanceof ArrayBuffer) {
          const regex = /^.+\.(jpeg|png)$/;
          const mediaSubtype = avatarUrl.match(regex)?.[1] as string | undefined;

          if (!mediaSubtype) {
            console.warn(
              'Unable to extract MIME subtype from user avatar url. The default type `jpeg` will be used.'
            );
          }

          return {
            data: `data:image/${mediaSubtype ?? 'jpeg'};base64,` + bufferToBase64(data),
            meta,
          };
        }

        const resolvedError = error
          ? { error, meta }
          : {
              error: {
                error: 'Failed attempt at transforming the response body to base64.',
                meta,
                status: 'CUSTOM_ERROR',
              } as const,
            };

        console.error(resolvedError);

        return resolvedError;
      },
    }),
    refetchMyAvatarBase64: builder.mutation<null, void>({
      invalidatesTags: ['MyAvatarBase64'],
      queryFn: () => ({ data: null }),
    }),
    setMyAvatar: builder.mutation<SetMyAvatarResponse, FormData>({
      invalidatesTags: ['Me'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const avatar = arg.get('file') as File;
          const avatarBase64 = await blobToBase64(avatar);

          dispatch(usersApi.util.upsertQueryData('getMyAvatarBase64', undefined, avatarBase64));
        } catch (e) {
          console.error("Don't forget to handle async errors!", e);
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

const selectMyProfile = usersApi.endpoints.getMe.select();

export const {
  useDeleteMyAvatarMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useLazyGetMyAvatarBase64Query,
  useSetMyAvatarMutation,
  useUpdateMeMutation,
} = usersApi;
