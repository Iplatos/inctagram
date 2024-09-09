import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    closeModal: (_, action: PayloadAction<false>) => {
      return action.payload;
    },
    openModal: (_, action: PayloadAction<true>) => {
      return action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { closeModal, openModal } = modalSlice.actions;
