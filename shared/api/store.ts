import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { appSlice } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';
import { ThunkAction, UnknownAction, combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { countriesApi } from './countries.api';
import { modalSlice } from './modal-slice';

const rootReducer = combineSlices(baseApi, countriesApi, appSlice, modalSlice, publicPageSlice);

//export const store = configureStore({
//  middleware: gDM => gDM().concat(baseApi.middleware, countriesApi.middleware),
// reducer: rootReducer,
//});

//export type AppDispatch = typeof store.dispatch;

//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// TODO: remove in the future. Consider using Redux devtools instead

import { Context, HYDRATE, createWrapper } from 'next-redux-wrapper';

import { publicPageSlice } from './public-page-slice';

export interface State {
  tick: string;
}

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: gDM => gDM().concat(baseApi.middleware, countriesApi.middleware),
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);

//setupListeners(store.dispatch);

//if (globalThis?.window) {
// @ts-ignore

// window.store = store;
//}
