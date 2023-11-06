import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://incubator-icta-trainee.uk',
    endpoints: () => ({}),
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<any, void>({
        query: () => `/api/v1/users`,
      }),
    };
  },

  reducerPath: 'baseApi',
});
export const { useGetDecksQuery } = baseApi;
