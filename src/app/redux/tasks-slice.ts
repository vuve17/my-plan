import type { Task, TaskString, UserTasksStringValuePairFormat, UserTasksValuePairFormat } from "../lib/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { convertTaskToTaskString,  } from "../lib/user-tasks-functions";

interface TaskState {
    tasks: UserTasksStringValuePairFormat | null; 
    selectedTask: TaskString | TaskString[] | null
}

const initialState: TaskState = {
    tasks: null,
    selectedTask: null
};

const UserTaskSlice = createSlice({
    name: "userTaskSlice",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<UserTasksStringValuePairFormat>) {
            const tasks = action.payload
            // const formatedTasks = convertTaskToTaskString(tasks)
            console.log("formatedTasks; ", tasks)
            state.tasks = tasks
        },
        getTask(state, action: PayloadAction<string>) {
            if (state.tasks && state.tasks[action.payload]) {
                state.selectedTask = state.tasks[action.payload]; 
            }
            state.selectedTask = null; 
        },
        setSelectedTask(state, action: PayloadAction<TaskString>) {
            state.selectedTask = action.payload
        }   
    },
});

export const { setTasks, getTask, setSelectedTask } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;
