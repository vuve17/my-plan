'use client'

import { configureStore } from '@reduxjs/toolkit'
import bookmarkSlice  from './bookmark-slice'
import screenReducer from "./screen-1500-slice";
import selectedDateSlice from './selected-date-slice';

export const store = configureStore({
  reducer: {
      bookmark: bookmarkSlice.reducer,
      screen: screenReducer,
      selectedDate: selectedDateSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



    // u reducer se dodaju svi createSlice (iz drugih fileova) da bi postali globalno dostupni
    // example: export const counterSlice = createSlice({ ... })
    // export default counterReducer
    // ctrl + space - pokazuje upcije unuta funkcije (izbornik)
    // counter : counterReducer
    
    // state aplikacije su sve varijable unutr reducera u configure storeu:
    // const store = configureStore({
      //   reducer: {
      //      theme: CounterSlice.reducer,
      //    }
      // })

      // useSelector = ((state) => state.theme)

      // state.theme