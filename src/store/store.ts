import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import generalParamsReducer from './general/general-params';
import citiesReducer from './cities/cities';
import userReducer from './user/user';

export const store = configureStore({
  reducer: {
    generalParams: generalParamsReducer,
    cities: citiesReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
