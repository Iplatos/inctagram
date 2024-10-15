import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { appSlice } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { countriesApi } from './countries.api';
import { modalSlice } from './modal-slice';

const rootReducer = combineSlices(baseApi, countriesApi, appSlice, modalSlice);

export const store = configureStore({
  middleware: gDM => gDM().concat(baseApi.middleware, countriesApi.middleware),
  reducer: rootReducer,
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// TODO: remove in the future. Consider using Redux devtools instead
if (globalThis?.window) {
  // @ts-ignore

  window.store = store;
}
