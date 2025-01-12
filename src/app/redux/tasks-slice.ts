import type { Task, TaskString, UserTasksStringValuePairFormat, UserTasksValuePairFormat } from "../lib/types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { convertTaskToTaskString, getTasks,  } from "../lib/user-tasks-functions";
import { isTaskString } from "../lib/user-tasks-functions";
import { setTasksInterface } from "../lib/types";
import { getTaskById } from "../lib/user-tasks-functions";

interface TaskState {
    fullTasks: TaskString[] | null;
    tasks: UserTasksStringValuePairFormat | null; 
    selectedTask: TaskString | null;
    selectedTasksMultiple: TaskString[] | null
}

const initialState: TaskState = {
    fullTasks: null,
    tasks: null,
    selectedTask: null,
    selectedTasksMultiple: null
};

const UserTaskSlice = createSlice({
    name: "userTaskSlice",
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<setTasksInterface>) {
            // const tasks = action.payload.formatedTasks
            // console.log("formatedTasks; redux ", action.payload.formatedTasks)
            // console.log("full tasks redux; ", action.payload.fullTasks)
            state.tasks = action.payload.formatedTasks
            state.fullTasks = action.payload.fullTasks
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
            // state.selectedTask = action.payload
            if(action.payload === null){
                state.selectedTask = action.payload
            } else {
                const task = getTaskById(state.fullTasks, action.payload.id);
                state.selectedTask = task;
            }
        },
        setSelectedTasksMultiple(state, action: PayloadAction<TaskString[] | null>) {
            const fullTasksArray: TaskString[] = []
            action.payload?.map((task) => {
                const fullTask = getTaskById(state.fullTasks, task.id);
                if (fullTask) {
                    fullTasksArray.push(fullTask);
                }
            })

            state.selectedTasksMultiple = fullTasksArray || null
        },
        resetStates(state){
            state.fullTasks = null
            state.selectedTask = null
            state.tasks = null
            state.selectedTasksMultiple = null
        }
    },
});

export const { setTasks, getSingleTask, setSelectedTask, setSelectedTasksMultiple, resetStates } = UserTaskSlice.actions;
export default UserTaskSlice.reducer;
