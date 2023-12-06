import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const addPhotoReducer = createSlice({
  initialState: {
    errorMessage: '',
  },
  name: 'addPhotoReducer',
  reducers: {
    showErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { showErrorMessage } = addPhotoReducer.actions;
