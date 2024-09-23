'use client'

import Cookies from "js-cookie"
import { Task, TaskString, UserTasksStringValuePairFormat, UserTasksValuePairFormat, TaskType} from '@/app/lib/types';
import { getCellIdFromTask, getCellIdFromStringTask } from './date-functions';


export const dynamic = 'force-dynamic'


interface returnedTasks {
    tasks: UserTasksStringValuePairFormat,
    status : number
}

export function validateTaskTypeField(taskType: string): taskType is TaskType {
    return taskType === "event" || taskType === "chore";
}


export function convertTaskToTaskString(tasks : UserTasksValuePairFormat) {

    const parsedTasks: UserTasksStringValuePairFormat = {};
    
    Object.entries(tasks).forEach(([key, task]) => {
        if (Array.isArray(task)) {
            parsedTasks[key] = task.map((t: Task) => ({
                ...t,
                startDate: new Date(t.startDate).toISOString(),
                endDate: new Date(t.endDate).toISOString(),
            }));
        } else {
            parsedTasks[key] = {
                ...task,
                startDate: new Date(task.startDate).toISOString(),
                endDate: new Date(task.endDate).toISOString(),
            };
        }
    });

    return parsedTasks;
}




export const convertTaskStringToTask = (tasks: UserTasksStringValuePairFormat): UserTasksValuePairFormat | null => {
    const parsedTasks: UserTasksValuePairFormat = {};
    
    Object.entries(tasks).forEach(([key, task]) => {
        if (Array.isArray(task)) {
            parsedTasks[key] = task.map((t: TaskString) => ({
                ...t,
                startDate: new Date(t.startDate),
                endDate: new Date(t.endDate),
                taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event"
            }));
        } else {
            parsedTasks[key] = {
                ...task,
                startDate: new Date(task.startDate),
                endDate: new Date(task.endDate),
                taskType: validateTaskTypeField(task.taskType) ? task.taskType : "event"
            };
        }
    });

    return parsedTasks;
};


export function formatJsonWithCellIds(tasks: UserTasksStringValuePairFormat) {
    const taskGroup : UserTasksStringValuePairFormat  = {};
    
    Object.entries(tasks).forEach(([key, value]) => {
        const cellId = getCellIdFromStringTask(Array.isArray(value) ? value[0] : value);
        taskGroup[cellId] = Array.isArray(value) ? value : value;
    });
    // console.log("taskGroup: ", taskGroup)
    return taskGroup;
}


export function confirmTaskType(task: any): task is Task {
    return (
        task &&
        typeof task.id === 'number' &&
        typeof task.title === 'string' &&
        task.startDate instanceof Date &&
        task.endDate instanceof Date &&
        typeof task.description === 'string' &&
        (task.taskType === "event" || task.taskType === "chore")    
    );
}

export async function getTasks() {
    const token = Cookies.get("refreshToken")
    const response = await fetch('/api/get-tasks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
        },
    })
    if(response.ok){
        const data : returnedTasks = await response.json();
        if (data.hasOwnProperty('tasks')) {
            const tasks = data.tasks
            // const tasksTypeOfTask : UserTasksValuePairFormat | null = convertTaskStringToTask(tasks)
            const formatedTasks : UserTasksStringValuePairFormat | null  = tasks ? formatJsonWithCellIds(tasks) : null
            // console.log("formatedTasks: ", formatedTasks) 
            if(formatedTasks == null)
            {
                throw new Error("something went wrong in getTasks()");       
            } 

            return formatedTasks
        }
    }
    else {
        console.error("failed to fetch tasks")
    }
}


