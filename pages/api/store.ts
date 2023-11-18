import { TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from '@/components/auth/slices/auth';
import { baseApi } from '@/pages/api/base-api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
