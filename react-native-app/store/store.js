import { configureStore } from '@reduxjs/toolkit';
import { distilleriesReducer } from './distilleries-slice';

export const store = configureStore({
  reducer: {
    distilleries: distilleriesReducer,
  },
});
