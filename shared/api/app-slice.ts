import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  accessToken?: string;
};

export const appSlice = createSlice({
  initialState: {} as InitialState,
  name: 'app',
  reducers: {
    accessTokenReceived: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  selectors: {
    selectAccessToken: state => state.accessToken,
    selectIsAuthenticated: state => !!state.accessToken,
  },
});

export const { accessTokenReceived } = appSlice.actions;
export const { selectAccessToken, selectIsAuthenticated } = appSlice.selectors;
