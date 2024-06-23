import { useReducer } from 'react';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  filter: string;
};

const initialState: InitialState = {
  filter: '',
};

export const useFilter = () => {
  const [state, dispatch] = useReducer(slice.reducer, {
    ...initialState,
  });

  return { actions: slice.actions, dispatch, state };
};

type GetPhotoType = {
  filter: string;
};

const slice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    getPhoto(state, action: PayloadAction<GetPhotoType>) {
      state.filter = action.payload.filter;
    },
  },
});

export const { getPhoto } = slice.actions;
