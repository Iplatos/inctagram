import { baseApi } from '@/shared/api/base-api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import {
  CreatePostImageResponse,
  CreatePostParams,
  CreatePostResponse,
  DeletePostParams,
  GetAnswerLikesParams,
  GetAnswerResponse,
  GetAnswersParams,
  GetCommentLikesParams,
  GetCommentsParams,
  GetCommentsResponse,
  GetLikesResponse,
  GetPostLikesParams,
  GetPostParams,
  GetPostResponse,
  UpdateLikeStatusPostParams,
  UpdatePostParams,
} from './posts-api.types';

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, CreatePostParams>({
      invalidatesTags: ['Posts', 'My-Profile'],
      queryFn: async ({ description, files }, _api, _extraOptions, baseQuery) => {
        try {
          const formData = new FormData();

          files.forEach(file => {
            formData.append('file', file);
          });

          const uploadResponse = await baseQuery({
            body: formData,
            method: 'POST',
            url: '/api/v1/posts/image',
          });

          if (uploadResponse.error) {
            return { error: uploadResponse.error as FetchBaseQueryError };
          }

          const uploadIds = (uploadResponse.data as CreatePostImageResponse)?.images?.map(
            image => image.uploadId
          );

          if (!uploadIds || uploadIds.length === 0) {
            return { error: { data: 'Invalid upload response', status: 400 } };
          }

          const createPostResponse = await baseQuery({
            body: {
              childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
              description,
            },
            method: 'POST',
            url: '/api/v1/posts',
          });

          if (createPostResponse.error) {
            return { error: createPostResponse.error as FetchBaseQueryError };
          }

          return { data: createPostResponse.data as CreatePostResponse };
        } catch (error) {
          console.error('An unexpected error occurred:', error);

          return { error: { data: 'An unexpected error occurred', status: 500 } };
        }
      },
    }),

    deletePost: builder.mutation<any, DeletePostParams>({
      invalidatesTags: ['Posts'],
      async queryFn({ postId, uploadIds }, _queryApi, _extraOptions, baseQuery) {
        const deletePostResponse = await baseQuery({
          method: 'DELETE',
          url: `/api/v1/posts/${postId}`,
        });

        if (deletePostResponse.error) {
          return { error: deletePostResponse.error };
        }

        for (const uploadId of uploadIds) {
          const deleteImageResponse = await baseQuery({
            method: 'DELETE',
            url: `/api/v1/posts/image/${uploadId}`,
          });

          if (deleteImageResponse.error) {
            return { error: deleteImageResponse.error };
          }
        }

        return { data: deletePostResponse.data };
      },
    }),

    getAnswerLikes: builder.query<GetLikesResponse, GetAnswerLikesParams>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'GET',
        url: `/api/v1/posts/${params.postId}/comments/${params.commentId}/answers/${params.answerId}/likes`,
      }),
    }),

    getAnswers: builder.query<GetAnswerResponse, GetAnswersParams>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'GET',
        url: `/api/v1/posts/${params.postId}/comments/${params.commentId}/answers`,
      }),
    }),

    getCommentLikes: builder.query<GetCommentsResponse, GetCommentsParams>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'GET',
        url: `/api/v1/posts/${params.postId}/comments`,
      }),
    }),

    getComments: builder.query<GetLikesResponse, GetCommentLikesParams>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'GET',
        url: `/api/v1/posts/${params.postId}/comments`,
      }),
    }),

    getPostLikes: builder.query<GetLikesResponse, GetPostLikesParams>({
      providesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'GET',
        url: `/api/v1/posts/${params.postId}/likes`,
      }),
    }),

    getPosts: builder.query<GetPostResponse, GetPostParams>({
      providesTags: ['Posts'],
      query: params => ({
        method: 'GET',
        url: `/api/v1/posts/${params.userName}`,
      }),
    }),

    updateLikeStatusPost: builder.mutation<any, UpdateLikeStatusPostParams>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: { likeStatus: 'NONE' },
        method: 'PUT',
        url: `/api/v1/posts/${params.postId}/like-status`,
      }),
    }),

    updatePost: builder.mutation<void, UpdatePostParams>({
      invalidatesTags: ['Posts'],
      query: ({ description, postId }) => ({
        body: { description: description },
        method: 'PUT',
        url: `/api/v1/posts/${postId}`,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAnswerLikesQuery,
  useGetAnswersQuery,
  useGetCommentLikesQuery,
  useGetCommentsQuery,
  useGetPostLikesQuery,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useUpdateLikeStatusPostMutation,
  useUpdatePostMutation,
} = postsApi;
