import type { BaseQueryFactory, BaseQueryFactoryParams } from '@/shared/api/base-api';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

type BaseQueryWithSubDomain = BaseQueryFn<
  (FetchArgs & { subdomain?: string | string[] }) | string,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;

export type BaseQueryFactoryWithSubdomain = (
  args: BaseQueryFactoryParams
) => BaseQueryWithSubDomain;

const urlRegex = /^((?:https?:\/\/)?(?:www\.)?)(.+)/i;

/**
 * A higher-order function designed to produce the `fetchBaseQuery` factory used by rtk-query, or its analogue.
 * When used as part of a function composition, the types of the received and returned values
 * must be changed to respect type of the preceding function in the composition chain.
 *
 * The `baseQuery` entity created by the factory enhanced by `withSubdomain`
 * expects an extended `args` parameter that has a `subdomain` field.
 * Therefore, for typing to work correctly when composing the `fetchBaseQuery` factory enhancers,
 * it is important that the enhancers preceding `withSubdomain` expect the factory passed to them as a parameter
 * to return a `baseQuery` compatible with the `BaseQueryWithSubdomain` type.
 *
 * @param baseQueryFactory - the rkt-query function `fetchBaseQuery` or a more specific version of it.
 * @return A factory function that returns a `baseQuery` that is compatible with rtk-query.
 * The `baseQuery` signature must include the optional `subdomain?: string | string[]` field
 * as part of its arguments.
 *
 * @example
 * const enhancedFetchBaseQuery = compose(withCoolFeature, withSubdomain)(fetchBaseQuery);
 *
 * const withCoolFeature = (
 *  baseQueryFactory: (args: FetchBaseQueryArgs) => BaseQueryWithSubDomain
 * ) => {
 *  const enhancedBaseQueryFactory = (
 *    args: FetchBaseQueryArgs = {}
 *  ): BaseQueryFn<
 *    (FetchArgs & { subdomain?: string | string[]; isCoolFeature?: boolean; }) | string,
 *    unknown,
 *    FetchBaseQueryError,
 *    {},
 *    FetchBaseQueryMeta
 *  > => {
 *    const baseQuery = baseQueryFactory(args)
 *
 *    return (args, api, extraOptions) => {
 *      if (typeof args !== 'string' && args.subdomain) {
 *         // `subdomain` is accessible here
 *      }
 *      // ...
 *
 *      return baseQuery(args, api, extraOptions); // `subdomain` arg is supplied
 *    }
 *
 *  return enhancedBaseQueryFactory;
 * }
 * */
export const withSubdomain = (baseQueryFactory: BaseQueryFactory) => {
  const enhancedBaseQueryFactory: BaseQueryFactoryWithSubdomain = ({ baseUrl, ...args } = {}) => {
    let baseUrlEnd = '';

    if (baseUrl !== undefined) {
      const match = baseUrl.match(urlRegex);

      if (match) {
        baseUrl = match[1];
        baseUrlEnd = match[2];
      } else {
        console.error(
          `It is impossible to split 'baseUrl' into parts for further insertion of subdomains.
          The passed 'baseUrl' will be used as is. Passed 'baseUrl': ${baseUrl}`
        );
      }
    }

    const baseQuery = baseQueryFactory({ ...args, baseUrl });

    return (args, api, extraOptions) => {
      const url = typeof args === 'string' ? args : args.url;

      // remove multiple slashes formed when combining optional url segments with trailing or preceding slashes
      const adjustedUrl = [baseUrlEnd, url].join('/').replace(/\/{2,}/g, '/');

      if (typeof args === 'string') {
        return baseQuery(adjustedUrl, api, extraOptions);
      }

      const { subdomain } = args;
      const resolvedSubdomain = Array.isArray(subdomain) ? subdomain.join('.') : subdomain;
      const urlWithSubdomain = subdomain ? [resolvedSubdomain, adjustedUrl].join('.') : adjustedUrl;

      return baseQuery({ ...args, url: urlWithSubdomain }, api, extraOptions);
    };
  };

  return enhancedBaseQueryFactory;
};
