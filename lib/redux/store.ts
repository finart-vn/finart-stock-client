import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/features/counter/counterSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
