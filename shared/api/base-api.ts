import type { RootState } from './store';

import { withReauth, withSubdomain } from '@/shared/api/enhancers';
import { compose } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { selectAccessToken } from './app-slice';

export type BaseQueryFactory = typeof fetchBaseQuery;
export type BaseQueryFactoryParams = Parameters<BaseQueryFactory>[0];
export type TypedBaseQueryFn = BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;

// Order matters, withSubdomain must be last in the chain!
const enhancedFetchBaseQuery = compose(withReauth, withSubdomain)(fetchBaseQuery);

const baseQuery = enhancedFetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
});

//

export const baseApi = createApi({
  baseQuery,
  endpoints: _builder => ({}),
  extractRehydrationInfo(action: any, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: 'baseApi',
  tagTypes: [
    'Auth',
    'Me',
    'MyAvatarBase64',
    'PublicUsers',
    'Posts',
    'Public-Posts',
    'My-Profile',
    'Users-Profile',
  ],
});

export const {
  util: { getRunningQueriesThunk },
} = baseApi;
