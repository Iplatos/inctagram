import { baseApi } from '@/shared/api/base-api';
import {
  AddFollowerParams,
  AddFollowerResponse,
  GetUserFollowersParams,
  GetUserFollowersResponse,
  GetUserFollowingParams,
  GetUserFollowingResponse,
  GetUserParams,
  GetUserResponse,
  GetUsersParams,
  GetUsersResponse,
  RemoveFollowerParams,
  RemoveFollowerResponse,
} from '@/shared/api/users/users-api.types';

export const UsersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addFollower: builder.query<RemoveFollowerResponse, RemoveFollowerParams>({
      providesTags: ['Users-Profile'],
      query: ({ userId }) => ({
        method: 'DELETE',
        url: `/api/v1/users/follower/${userId}`,
      }),
    }),
    getUser: builder.query<GetUserResponse, GetUserParams>({
      providesTags: ['Users-Profile'],
      query: ({ userName }) => ({
        method: 'GET',
        url: `/api/v1/users/${userName}`,
      }),
    }),
    getUserFollowers: builder.query<GetUserFollowersResponse, GetUserFollowersParams>({
      providesTags: ['Users-Profile'],
      query: ({ cursor = 0, pageNumber, pageSize = 12, search, userName }) => ({
        method: 'GET',
        params: { cursor, pageNumber, pageSize, search },
        url: `/api/v1/users/${userName}/followers`,
      }),
    }),
    getUserFollowing: builder.query<GetUserFollowingResponse, GetUserFollowingParams>({
      providesTags: ['Users-Profile'],
      query: ({ cursor = 0, pageNumber, pageSize = 12, search, userName }) => ({
        method: 'GET',
        params: { cursor, pageNumber, pageSize, search },
        url: `/api/v1/users/${userName}/following`,
      }),
    }),

    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      providesTags: ['Users-Profile'],
      query: ({ cursor = 0, pageNumber, pageSize = 12, search }) => ({
        method: 'GET',
        params: { cursor, pageNumber, pageSize, search },
        url: '/api/v1/users',
      }),
    }),
    removeFollower: builder.query<AddFollowerResponse, AddFollowerParams>({
      providesTags: ['Users-Profile'],
      query: ({ selectedUserId }) => ({
        body: { selectedUserId },
        method: 'POST',
        url: `/api/v1/users/following`,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = UsersApi;
