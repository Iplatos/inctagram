import type { BaseQueryFabric, BaseQueryFabricParams } from '@/shared/api/base-api';
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

const urlRegex = /^((?:https?:\/\/)?(?:www\.)?)(.+)/i;

export const withSubdomain = (baseQueryFabric: BaseQueryFabric) => {
  const enhancedBaseQueryFabric = ({
    baseUrl,
    ...args
  }: BaseQueryFabricParams = {}): BaseQueryWithSubDomain => {
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

    const baseQuery = baseQueryFabric({ ...args, baseUrl });

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

  return enhancedBaseQueryFabric;
};
