import { baseApi } from '@/shared/api/base-api';

import { PublicAPIResponse } from '../types/common.types';
import { PublicUsersResponse } from '../types/public.types';

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
  }),
});

export const { useGetTotalUsersCountQuery } = PublicUserApi;
