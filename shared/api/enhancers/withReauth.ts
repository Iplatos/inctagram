import type { RefreshTokenResponse } from '@/shared/types/auth.types';

import { accessTokenReceived, resetApp } from '@/shared/api/app-slice';
import { BaseQueryFactoryWithSubdomain } from '@/shared/api/enhancers/withSubdomain';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

/**
 * A higher-order function designed to produce the `fetchBaseQuery` factory used by rtk-query, or its analogue.
 * When used as part of a function composition, the types of the received and returned values
 * must be changed to match the preceding function in the composition chain.
 *
 * @param baseQueryFactory - the rkt-query function `fetchBaseQuery` or a more specific version of it.
 * @return A factory function that returns a `baseQuery` that is compatible
 * with rtk-query. Must have the same type as the `baseQueryFactory` parameter,
 * since this HOF returns a function with the same signature as the received function.
 *
 * @example
 * type FetchBaseQueryWithCoolFeature = (args: FetchBaseQueryArgs) => BaseQueryWithCoolFeature;
 *
 * type BaseQueryWithCooFeature = BaseQueryFn<
 *    (FetchArgs & { isCoolFeature?: boolean; }) | string,
 *    unknown,
 *    FetchBaseQueryError,
 *    {},
 *    FetchBaseQueryMeta
 * >;
 *
 * const enhancedFetchBaseQuery = compose(withReauth, withCoolFeature)(fetchBaseQuery);
 *
 * const withReauth = (
 *  baseQueryFactory: FetchBaseQueryWithCoolFeature
 * ) => {
 *  const enhancedBaseQueryFactory: FetchBaseQueryWithCoolFeature = args => {
 *    const baseQuery = baseQueryFactory(args)
 *
 *    return (args, api, extraOptions) => {
 *      if (typeof args !== 'string' && args.isCoolFeature) {
 *         // `isCoolFeature` is accessible here
 *      }
 *      // ...
 *
 *      return baseQuery(args, api, extraOptions); // `isCoolFeature` arg is supplied
 *    }
 *
 *   return enhancedBaseQueryFactory;
 * }
 */
export const withReauth = (baseQueryFactory: BaseQueryFactoryWithSubdomain) => {
  const enhancedBaseQueryFactory: BaseQueryFactoryWithSubdomain = args => {
    const baseQuery = baseQueryFactory(args);

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

  return enhancedBaseQueryFactory;
};
