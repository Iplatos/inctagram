import { baseApi } from '../base-api';
import { GetPublicationsParams, GetPublicationsResponse } from './publication-api.types';

export const PublicationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublications: builder.query<GetPublicationsResponse, GetPublicationsParams>({
      providesTags: ['Publications'],
      query: ({ endCursorPostId = 0, pageNumber, pageSize = 12 }) => ({
        method: 'GET',
        params: { endCursorPostId, pageNumber, pageSize },
        url: '/api/v1/home/publications-followers',
      }),
    }),
  }),
});

export const { useGetPublicationsQuery } = PublicationsApi;
