'use client'

import { configureStore } from '@reduxjs/toolkit'
import screenReducer from "./screen-1200-slice";
import selectedDateSlice from './selected-date-slice';
import schedulerVisibilitySlice from './scheduler-visibility-slice';
import bookmarkSlice from './bookmark-slice';
import testSlice from './test-slice';

export const store = configureStore({
  reducer: {
      screen: screenReducer,
      selectedDate: selectedDateSlice,
      schedulerVisibility: schedulerVisibilitySlice,
      bookmark: bookmarkSlice.reducer,
      test: testSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;