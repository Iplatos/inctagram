import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    resetAuth: () => initialState,
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { resetAuth, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
