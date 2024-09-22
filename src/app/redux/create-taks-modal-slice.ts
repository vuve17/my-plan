import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from '@/app/lib/types';

const initialState = {
    isTaskModalActive : false,
    taskModalDate: new Date().toISOString(),
        // task: new Date().toISOString(),
};

const createTaskModalSlice = createSlice({
    initialState,
    name: "createTaskModal",
    reducers: {
        setIsTaskModalActive(state, action: PayloadAction<boolean>){
            state.isTaskModalActive = action.payload 
        },
        setTaskModalDate(state, action:PayloadAction<string>){
            state.taskModalDate = action.payload
        },
        // setTaskModalTask(state, action:PayloadAction<string>){
        //     state.task = action.payload
        // },
    } 
})

export const { setIsTaskModalActive, setTaskModalDate } = createTaskModalSlice.actions;
export default createTaskModalSlice.reducer;