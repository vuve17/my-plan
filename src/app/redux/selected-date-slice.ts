import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDate: new Date().toISOString()
};

const selectedDateSlice = createSlice({
    initialState,
    name: "selectedDate",
    reducers: {
        setSelectedDate(state, action){
            state.selectedDate = action.payload
        }
    }
    
})

export const { setSelectedDate } = selectedDateSlice.actions;
export default selectedDateSlice.reducer;