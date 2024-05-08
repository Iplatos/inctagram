import type {
  BaseQueryFabric,
  BaseQueryFabricParams,
  TypedBaseQueryFn,
} from '@/shared/api/base-api';
import type { RefreshTokenResponse } from '@/shared/types/auth.types';

import { accessTokenReceived, resetApp } from '@/shared/api/app-slice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export const withReauth = (baseQueryFabric: BaseQueryFabric) => {
  const enhancedBaseQueryFabric = (args: BaseQueryFabricParams): TypedBaseQueryFn => {
    const baseQuery = baseQueryFabric(args);

    return async (args, api, extraOptions) => {
      // wait until the mutex is available for each request
      await mutex.waitForUnlock();
      const attempt = await baseQuery(args, api, extraOptions);

      if (attempt.error && attempt.error.status === 401) {
        const reauthIsInProgress = mutex.isLocked();

        // several requests with a 401 error are waiting for the re-authorization attempt to complete in order to try again
        if (reauthIsInProgress) {
          await mutex.waitForUnlock();

          return baseQuery(args, api, extraOptions);
        }

        // the very first 401 error blocks the mutex for re-authorization
        const release = await mutex.acquire();

        try {
          const { data: refreshResult } = await baseQuery('auth/refresh-token', api, extraOptions);

          if (refreshResult) {
            const { accessToken } = (refreshResult as unknown as RefreshTokenResponse).data;

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
  };

  return enhancedBaseQueryFabric;
};
