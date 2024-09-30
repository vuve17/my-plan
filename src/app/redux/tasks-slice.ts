import type { Task, TaskString, UserTasksStringValuePairFormat, UserTasksValuePairFormat } from "../lib/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { convertTaskToTaskString,  } from "../lib/user-tasks-functions";
import { isTaskString } from "../lib/user-tasks-functions";

interface TaskState {
    tasks: UserTasksStringValuePairFormat | null; 
    selectedTask: TaskString | null
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
            console.log("formatedTasks; ", tasks)
            state.tasks = tasks
        },
        getSingleTask(state, action: PayloadAction<string>) {
            if (state.tasks && state.tasks[action.payload]) {
                const task = state.tasks[action.payload];
                if (isTaskString(task)) {
                    state.selectedTask = task; 
                } else {
                    state.selectedTask = null; 
                }
            }
        },
        setSelectedTask(state, action: PayloadAction<TaskString | null>) {
            state.selectedTask = action.payload
        }   
    },
});

export const { setTasks, getSingleTask, setSelectedTask } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;
