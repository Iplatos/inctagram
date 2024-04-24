import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  accessToken?: string;
};

const initialState: InitialState = {};

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    accessTokenReceived: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    resetApp: () => initialState,
  },
  selectors: {
    selectAccessToken: state => state.accessToken,
    selectIsAuthenticated: state => !!state.accessToken,
  },
});

export const { accessTokenReceived, resetApp } = appSlice.actions;
export const { selectAccessToken, selectIsAuthenticated } = appSlice.selectors;
