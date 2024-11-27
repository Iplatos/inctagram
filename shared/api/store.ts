import { appSlice } from '@/shared/api/app-slice';
import { baseApi } from '@/shared/api/base-api';
import { ThunkAction, UnknownAction, combineSlices, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { countriesApi } from './countries.api';
import { modalSlice } from './modal-slice';
import { publicPageSlice } from './public-page-slice';

const rootReducer = combineSlices(baseApi, countriesApi, appSlice, modalSlice, publicPageSlice);

export const store = configureStore({
  middleware: gDM => gDM().concat(baseApi.middleware, countriesApi.middleware),
  reducer: rootReducer,
});

// setupListeners(store.dispatch);

//export type AppDispatch = typeof store.dispatch;

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

export const wrapper = createWrapper<AppStore>(makeStore);
