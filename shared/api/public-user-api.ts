import { baseApi } from '@/shared/api/base-api';

import { PublicAPIResponse } from '../types/common.types';
import { PublicProfileByIdResponse, PublicUsersResponse } from '../types/public.types';

export const PublicUserApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTotalUsersCount: builder.query<PublicAPIResponse<PublicUsersResponse>, void>({
      providesTags: ['PublicUsers'],
      query: () => {
        return {
          url: '/api/v1/public-user',
        };
      },
    }),

    getUserPublicProfile: builder.query<PublicProfileByIdResponse, number>({
      providesTags: ['PublicUsers'],
      query: profileId => {
        return {
          url: `/api/v1/public-user/profile/${profileId}`,
        };
      },
    }),
  }),
});

export const { useGetTotalUsersCountQuery, useGetUserPublicProfileQuery } = PublicUserApi;
