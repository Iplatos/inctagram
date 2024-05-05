import type { RootState } from '@/shared/api/store';
import type { RefreshTokenResponse } from '@/shared/types/auth.types';

import { accessTokenReceived, resetApp, selectAccessToken } from '@/shared/api/app-slice';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
  timeout: 10_000,
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available for each request
  await mutex.waitForUnlock();
  const attempt = await baseQuery(args, api, extraOptions);

  if (attempt.error && attempt.error.status === 401) {
    const reauthIsInProgress = mutex.isLocked();

    // several requests with a 401 error are waiting for the re-authorisation attempt to complete in order to try again
    if (reauthIsInProgress) {
      await mutex.waitForUnlock();

      return baseQuery(args, api, extraOptions);
    }

    // the very first 401 error blocks the mutex for re-authorisation
    const release = await mutex.acquire();

    try {
      const { data: refreshResult } = await baseQuery('auth/refresh-token', api, extraOptions);

      if (refreshResult) {
        const { accessToken } = (refreshResult as RefreshTokenResponse).data;

        api.dispatch(accessTokenReceived(accessToken));

        // retry the initial query
        return baseQuery(args, api, extraOptions);
      }

      api.dispatch(resetApp());
    } finally {
      // release must be called once the mutex should be released again.
      release();
    }
  }

  return attempt;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: _builder => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Auth'],
});
