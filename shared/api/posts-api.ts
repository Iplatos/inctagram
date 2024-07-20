import { baseApi } from '@/shared/api/base-api';

import {
  PostByIdRequest,
  PostsResponseType,
  PublicPostType,
  getPostsRequestData,
} from '../types/posts.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<any, FormData>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'POST',
        subdomain: 'files',
        url: 'posts',
      }),
    }),
    deletePostById: builder.mutation<any, PostByIdRequest>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'DELETE',
        subdomain: 'files',
        url: 'posts',
      }),
    }),
    getPostById: builder.query<any, PostByIdRequest>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        subdomain: 'read',
        url: `posts/${params.id}`,
      }),
    }),
    getPosts: builder.query<PostsResponseType, getPostsRequestData>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        subdomain: 'read',
        url: 'posts',
      }),
    }),
    getPublicPosts: builder.query<PublicPostType[], void>({
      providesTags: ['Posts'],
      query: () => ({
        subdomain: 'read',
        url: 'posts/public',
      }),
    }),
    updatePostById: builder.mutation<any, PostByIdRequest>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'PUT',
        subdomain: 'files',
        url: 'posts',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetPublicPostsQuery,
  useUpdatePostByIdMutation,
} = postsApi;
