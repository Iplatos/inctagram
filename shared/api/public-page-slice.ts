import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PublicPostsResponse } from '../types/public.types';

type InitialState = {
  posts?: PublicPostsResponse;
  totalUsersCount?: number;
};

const initialState: InitialState = {};

export const publicPageSlice = createSlice({
  initialState,
  name: 'public-page',
  reducers: {
    publicPageDataReceived: (state, action: PayloadAction<InitialState>) => {
      state.posts = action.payload.posts;
      state.totalUsersCount = action.payload.totalUsersCount;
    },
    resetApp: () => initialState,
  },
  selectors: {
    selectPosts: state => state.posts,
    selectTotalUsersCount: state => state.totalUsersCount,
  },
});

export const { publicPageDataReceived } = publicPageSlice.actions;
export const { selectPosts, selectTotalUsersCount } = publicPageSlice.selectors;
