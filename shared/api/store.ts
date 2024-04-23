import { addPhotoReducer } from '@/features/addPhoto/addPhoto.slice';
import { appSlice } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { countriesApi } from './countries.api';

const rootReducer = combineSlices(baseApi, countriesApi, appSlice, {
  [addPhotoReducer.name]: addPhotoReducer.reducer,
});

export const store = configureStore({
  middleware: gDM => gDM().concat(baseApi.middleware, countriesApi.middleware),
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// TODO: remove in the future. Consider using Redux devtools instead
if (globalThis?.window) {
  // @ts-ignore

  window.store = store;
}
