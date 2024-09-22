'use client'

import { configureStore } from '@reduxjs/toolkit'
import screenReducer from "./screen-1200-slice";
import selectedDateSlice from './selected-date-slice';
import schedulerVisibilitySlice from './scheduler-visibility-slice';
import bookmarkSlice from './bookmark-slice';
import testSlice from './test-slice';
import snackbarSlice from './snackbar-slice';
import createTaskModalSlice from './create-taks-modal-slice';
import UserTaskSlice from './tasks-slice';

export const store = configureStore({
  reducer: {
      screen: screenReducer,
      selectedDate: selectedDateSlice,
      schedulerVisibility: schedulerVisibilitySlice,
      bookmark: bookmarkSlice.reducer,
      test: testSlice,
      snackbar: snackbarSlice,
      createTaskModal: createTaskModalSlice,
      tasks: UserTaskSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;