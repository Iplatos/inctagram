import { baseApi } from '@/shared/api/base-api';

export const postsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<any, FormData>({
      invalidatesTags: ['Posts'],
      query: params => ({
        body: params,
        method: 'POST',
        url: '/api/v1/posts',
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
      query: id => ({
        body: id,
        subdomain: 'read',
        url: `posts/${id}`,
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

export type Post = {
  cursor: number;
  id: string;
  photo: {
    aspectRatio: string;
    offsetX: number | number[];
    offsetY: number | number[];
    scale: number | number[];
    url: string;
  };
};

export type PostsResponseType = {
  items: Post[];
  size: number;
};

export type getPostsRequestData = {
  cursor: number;
  size: number;
  userId: string;
};

export type PostByIdRequest = string | string[] | undefined;
export type PublicPostType = {
  createdAt: string;
  description: string;
  id: string;
  photos: [
    {
      aspectRatio: string;
      offsetX: number | number[];
      offsetY: number | number[];
      scale: number | number[];
      url: string;
    },
  ];
  user: {
    avatar: {
      createdAt: string;
      id: string;
      offsetX: number | number[];
      offsetY: number | number[];
      scale: number | number[];
      updatedAt: string;
      url: string;
    };
    id: string;
    username: string;
  };
};
