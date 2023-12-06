import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { addPhotoReducer } from '@/features/addPhoto/addPhoto.slice';
import { baseApi } from '@/shared/api/base-api';
import authReducer from '@/widgets/auth/slices/auth';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [addPhotoReducer.name]: addPhotoReducer.reducer,
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
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
