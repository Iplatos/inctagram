import { baseApi } from '@/shared/api/base-api';
import {
  CreateCommentRequestParams,
  CreateCommentResponseParams,
} from '@/shared/api/comments-answers/comments-answers-api.types';

export const commentsAnswersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<CreateCommentResponseParams, CreateCommentRequestParams>({
      invalidatesTags: ['Posts'],
      query: ({ comment, postId }) => ({
        body: { content: comment },
        method: 'POST',
        url: `/api/v1/posts/${postId}/comments`,
      }),
    }),
  }),
});

export const { useCreateCommentMutation } = commentsAnswersApi;
