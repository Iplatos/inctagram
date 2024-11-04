import { baseApi } from '@/shared/api/base-api';

import { PublicAPIResponse } from '../types/common.types';
import {
  GetPublicPostsRequest,
  PostByIdRequest,
  PublicPostByIdResponse,
  PublicPostsByUserIdResponse,
  PublicPostsResponse,
} from '../types/public.types';

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPostById: builder.query<PublicPostByIdResponse, PostByIdRequest>({
      providesTags: ['Public-Posts'],
      query: id => `/api/v1/public-posts/${id}`,
    }),

    getPublicPosts: builder.query<PublicAPIResponse<PublicPostsResponse>, GetPublicPostsRequest>({
      providesTags: ['Public-Posts'],
      query: ({ pageSize }) => `/api/v1/public-posts/all/?pageSize=${pageSize}`,
    }),

    getPublicPostsByUserId: builder.query<PublicPostsByUserIdResponse, any>({
      providesTags: ['Public-Posts'],
      query: ({ userId }) => `/api/v1/public-posts/user/${userId}`,
    }),
  }),
});

export const { useGetPublicPostByIdQuery, useGetPublicPostsQuery } = publicPostsApi;
