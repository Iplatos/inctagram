import { baseApi } from '@/shared/api/base-api';

import { PublicAPIResponse } from '../types/common.types';
import {
  GetPublicPostsRequest,
  PublicPostByIdResponse,
  PublicPostsResponse,
} from '../types/public.types';
import { PostByIdRequest } from './posts-api';

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPostById: builder.query<PublicAPIResponse<PublicPostByIdResponse>, PostByIdRequest>({
      providesTags: ['Public-Posts'],
      query: id => `/api/v1/public-posts/${id}`,
    }),
    getPublicPosts: builder.query<PublicAPIResponse<PublicPostsResponse>, GetPublicPostsRequest>({
      providesTags: ['Public-Posts'],
      query: ({ pageSize }) => `/api/v1/public-posts/all/?pageSize=${pageSize}`,
    }),
    getPublicPostsByUserId: builder.query<any, any>({
      providesTags: ['Public-Posts'],
      query: ({ userId }) => `/api/v1/public-posts/user/${userId}`,
    }),
  }),
});

export const { useGetPublicPostByIdQuery, useGetPublicPostsQuery } = publicPostsApi;
