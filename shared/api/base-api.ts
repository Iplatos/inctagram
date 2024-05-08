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

import { selectAccessToken } from './app-slice';

export type BaseQueryFabric = typeof fetchBaseQuery;
export type BaseQueryFabricParams = Parameters<BaseQueryFabric>[0];
export type TypedBaseQueryFn = BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
>;

/**
 * The `baseQuery` entity created by the factory enhanced by `withSubdomain`
 * expects an extended `args` parameter that has a `subdomain` field.
 * Therefore, for typing to work correctly when composing the `fetchBaseQuery` factory enhancers,
 * it is important that the enhancers preceding `withSubdomain` expect the factory passed to them as a parameter
 * to return a `baseQuery` compatible with the `BaseQueryWithSubdomain` type.
 *
 * @example
 * const enhancedFetchBaseQuery = compose(withCoolFeature, withSubdomain)(fetchBaseQuery);
 *
 * const withCoolFeature = (
 *  baseQueryFactory: (args: BaseQueryFactoryArgs) => BaseQueryWithSubdomain
 * ) => {
    const enhancedBaseQueryFabric = ({
      baseUrl,
      ...args
    }: BaseQueryFabricParams = {}): BaseQueryFn<
      (FetchArgs & { domain?: string | string[]; isCoolFeature?: boolean; }) | string,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    > => {
*     const baseQuery = baseQueryFactory(args)
*
*     return (args, api, extraOptions) => {
*       const { isCoolFeature } = args; // domain is accessible here
*       // ...
*       
*       return baseQuery(args, api, extraOptions); // `domain` arg is supplied
*     }
* 
*     return enhancedBaseQueryFabric;
* }
 * */
const enhancedFetchBaseQuery = compose(withSubdomain, withReauth)(fetchBaseQuery);

const baseQuery = enhancedFetchBaseQuery({
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

export const baseApi = createApi({
  baseQuery,
  endpoints: _builder => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Auth'],
});
