'use client'

import { configureStore } from '@reduxjs/toolkit'
import bookmarkSlice  from './bookmark-slice'
import screenReducer from "./screen-1500-slice";
import selectedDateSlice from './selected-date-slice';
import schedulerVisibilitySlice from './scheduler-visibility-slice';

export const store = configureStore({
  reducer: {
      bookmark: bookmarkSlice.reducer,
      screen: screenReducer,
      selectedDate: selectedDateSlice,
      schedulerVisibility: schedulerVisibilitySlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;