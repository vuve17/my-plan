import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    schedulerVisibility: true
};

const schedulerVisibilitySlice = createSlice({
    initialState,
    name: "schedulerVisibility",
    reducers: {
        setSchedulerVisibility(state, action: PayloadAction<boolean>){
            state.schedulerVisibility = action.payload
            console.log( state.schedulerVisibility)
        }
    }
})

export const { setSchedulerVisibility } = schedulerVisibilitySlice.actions;
export default schedulerVisibilitySlice.reducer;