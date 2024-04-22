import type { RootState } from '@/shared/api/store';

import { selectAccessToken } from '@/shared/api/app-slice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
