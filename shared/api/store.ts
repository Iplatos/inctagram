import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { addPhotoReducer } from '@/features/addPhoto/addPhoto.slice';
import { baseApi } from '@/shared/api/base-api';
import { authSlice } from '@/widgets/auth/slices/auth';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  [addPhotoReducer.name]: addPhotoReducer.reducer,
  [authSlice.name]: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент

if (globalThis?.window) {
  // @ts-ignore

  window.store = store;
}
