import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://incubator-icta-trainee.uk';
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => {
    return {
      filteredPosts: builder.query<any, void>({
        query: () => `/api/v1/post/filtered-posts/title`,
      }),
      getFeed: builder.query<any, void>({
        query: () => `/api/v1/post/feed`,
      }),
    };
  },
  /*  prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromLocalStorage();
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
  
      return headers;
    },*/
  reducerPath: 'baseApi',
});

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('X_auth_token');
};
export const setTokenToLocalStorage = (token: null | string) => {
  if (!token) {
    return localStorage.removeItem('X_auth_token');
  }

  return localStorage.setItem('X_auth_token', token);
};
export const { useFilteredPostsQuery, useGetFeedQuery } = baseApi;
