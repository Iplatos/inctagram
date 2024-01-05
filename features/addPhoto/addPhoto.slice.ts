import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const addPhotoReducer = createSlice({
  initialState: {
    avatar: '',
    avatarForReq: {},
    errorMessage: '',
  },
  name: 'addPhotoReducer',
  reducers: {
    setAvatarForRequest: (state, action: PayloadAction<any>) => {
      state.avatarForReq = action.payload;
    },
    showErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    showPreViewAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatarForRequest, showErrorMessage, showPreViewAvatar } = addPhotoReducer.actions;
