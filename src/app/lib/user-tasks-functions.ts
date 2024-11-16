'use client'

import Cookies from "js-cookie"
import { Task, TaskString, UserTasksStringValuePairFormat, UserTasksValuePairFormat, TaskType} from '@/app/lib/types';
// import { getCellIdFromTask, getCellIdFromStringTask } from './date-functions';


export const dynamic = 'force-dynamic'

interface returnedTasks {
    tasks: UserTasksStringValuePairFormat,
    status : number
}

export function validateTaskTypeField(taskType: string): taskType is TaskType {
    return taskType === "event" || taskType === "chore";
}

export function isTask(task: any): task is Task {
    return (
        task &&
        typeof task.id === 'number' &&
        typeof task.title === 'string' &&
        task.startDate instanceof Date &&
        task.endDate instanceof Date &&
        typeof task.description === 'string' &&
        typeof task.taskType === 'string'
    );
}

export function isTaskString(task: any): task is TaskString {
    return (
        task &&
        typeof task.id === 'number' &&
        typeof task.title === 'string' &&
        typeof task.startDate === 'string' &&
        typeof task.endDate === 'string' &&
        typeof task.description === 'string' &&
        typeof task.taskType === 'string'
    );
}

export function convertTaskToTaskString (tasks : Task | Task[]) {
    if (Array.isArray(tasks)) {
         const tasksFormated = tasks.map((t: Task) => ({
            ...t,
            startDate: new Date(t.startDate).toISOString(),
            endDate: new Date(t.endDate).toISOString(),
        }));
        return tasksFormated
    } else {
        const taskFormated  = {
            ...tasks,
            startDate: new Date(tasks.startDate).toISOString(),
            endDate: new Date(tasks.endDate).toISOString(),
        };
        return taskFormated
    }
}

export function  convertSingleTaskStringToTask(task: TaskString) {
    const taskFormated  = {
        ...task,
        startDate: new Date(task.startDate),
        endDate: new Date(task.endDate),
        taskType: validateTaskTypeField(task.taskType) ? task.taskType : "event"
    };
    return taskFormated
}

export function convertSingleTaskToTaskString(task: Task) {
    const taskFormated  = {
        ...task,
        startDate: new Date(task.startDate).toISOString(),
        endDate: new Date(task.endDate).toISOString(),
    };
    return taskFormated
}

export function convertTaskStringToTask (tasks : TaskString | TaskString[]) {
    if (Array.isArray(tasks)) {
         const tasksFormated = tasks.map((t: TaskString) => ({
            ...t,
            startDate: new Date(t.startDate),
            endDate: new Date(t.endDate),
            taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event"
        }));
        return tasksFormated
    } else {
        const taskFormated  = convertSingleTaskStringToTask(tasks)
        return taskFormated
    }
}


export function convertTaskToTaskStringValuePair(tasks : UserTasksValuePairFormat) {
    const parsedTasks: UserTasksStringValuePairFormat = {};
    Object.entries(tasks).forEach(([key, task]) => {
        if (Array.isArray(task)) {
            parsedTasks[key] = task.map((t: Task) => ({
                ...t,
                startDate: new Date(t.startDate).toISOString(),
                endDate: new Date(t.endDate).toISOString(),
            }));
        } else {
            parsedTasks[key] = convertSingleTaskToTaskString(task)
        }
    });
    return parsedTasks;
}


export const convertTaskStringToTaskValuePair = (tasks: UserTasksStringValuePairFormat): UserTasksValuePairFormat | null => {
    const parsedTasks: UserTasksValuePairFormat = {};
    if(!tasks || Object.keys(tasks).length === 0) {
        return null
    }
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


function getCellIdFromStringTask(task: TaskString): string {
    const date = new Date(task.startDate);
    return `${date.getMonth() + 1}${date.getDate()}${date.getFullYear()}_${date.getHours()}`;
}


export function formatJsonWithCellIds(tasks: UserTasksStringValuePairFormat) {
    const taskGroup : UserTasksStringValuePairFormat  = {};
    Object.entries(tasks).forEach(([key, value]) => {
        const cellId = getCellIdFromStringTask(Array.isArray(value) ? value[0] : value);
        taskGroup[cellId] = Array.isArray(value) ? value : value;
    });
    console.log("taskGroup: ", taskGroup)
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
            console.log("tasks: get tasks initial !", tasks)
            const formatedTasks : UserTasksStringValuePairFormat | null  = tasks ? formatJsonWithCellIds(tasks) : null
            if(formatedTasks == null)
            {
                throw new Error("something went wrong in getTasks()");       
            } 
            console.log(formatedTasks)
            return formatedTasks
        }
    }
    else {
        console.error("failed to fetch tasks")
    }
}

export function isTaskExpandingTroughoutMultipleDays(task : Task) {
    const startDate = new Date (task.startDate)
    const endDate = new Date (task.startDate)
    if((endDate.getDay() - startDate.getDay()) > 0)
    {
        console.log("more then 1 day, expland")
    } else {
        return false
    }
}


// correct one !!!
// export const convertTaskStringToTaskValuePair = (tasks: UserTasksStringValuePairFormat): UserTasksValuePairFormat | null => {
//     const parsedTasks: UserTasksValuePairFormat = {};
//     if(!tasks || Object.keys(tasks).length === 0) {
//         return null
//     }
//     Object.entries(tasks).forEach(([key, task]) => {
//         if (Array.isArray(task)) {
//             parsedTasks[key] = task.map((t: TaskString) => ({
//                 ...t,
//                 startDate: new Date(t.startDate),
//                 endDate: new Date(t.endDate),
//                 taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event"
//             }));
//         } else {
//             parsedTasks[key] = {
//                 ...task,
//                 startDate: new Date(task.startDate),
//                 endDate: new Date(task.endDate),
//                 taskType: validateTaskTypeField(task.taskType) ? task.taskType : "event"
//             };
//         }
//     });
//     return parsedTasks;
// };


// export const convertTaskStringToTaskValuePair = (tasks: UserTasksStringValuePairFormat): UserTasksValuePairFormat | null => {
//     const parsedTasks: UserTasksValuePairFormat = {};
//     if (!tasks || Object.keys(tasks).length === 0) {
//         return null;
//     }

//     Object.entries(tasks).forEach(([key, task]) => {
//         if (Array.isArray(task)) {
//             parsedTasks[key] = task.map((t: TaskString) => ({
//                 ...t,
//                 startDate: new Date(t.startDate),
//                 endDate: new Date(t.endDate),
//                 taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event"
//             }));
//         } else {
//             parsedTasks[key] = {
//                 ...task,
//                 startDate: new Date(task.startDate),
//                 endDate: new Date(task.endDate),
//                 taskType: validateTaskTypeField(task.taskType) ? task.taskType : "event"
//             };
//         }
//     });
//     return parsedTasks;
// };

//   // correct one !!!

//   export function formatJsonWithCellIds(tasks: UserTasksStringValuePairFormat): UserTasksStringValuePairFormat {
//     const taskGroup: UserTasksStringValuePairFormat = {};
  
//     Object.entries(tasks).forEach(([key, value]) => {
//       const task = Array.isArray(value) ? value[0] : value;
//       const start = new Date(task.startDate);
//       const end = new Date(task.endDate);
  
//       // Handle tasks within a single day
//       if (start.toDateString() === end.toDateString()) {
//         const cellId = getDailyCellId(start);
//         taskGroup[cellId] = task;
//       } else {
//         // Multi-day tasks need to be divided into daily entries
//         let currentDate = new Date(start);
//         let isFirstDay = true;
  
//         while (currentDate <= end) {
//           const cellId = getDailyCellId(currentDate);
  
//           let dayStart = new Date(currentDate);
//           let dayEnd = new Date(currentDate);
  
//           if (isFirstDay) {
//             dayStart = new Date(start);
//             dayEnd.setHours(23, 59, 59, 999);
//             isFirstDay = false;
//           } else if (currentDate.toDateString() === end.toDateString()) {
//             dayStart.setHours(0, 0, 0, 0);
//             dayEnd = new Date(end);
//           } else {
//             dayStart.setHours(0, 0, 0, 0);
//             dayEnd.setHours(23, 59, 59, 999);
//           }
  
//           // Create a task segment for each cell ID with adjusted start and end times
//           const taskPart: TaskString = {
//             ...task,
//             startDate: dayStart.toISOString(),
//             endDate: dayEnd.toISOString(),
//           };
  
//           // Handle adding to taskGroup
//           if (!taskGroup[cellId]) {
//             taskGroup[cellId] = taskPart;
//           } else if (Array.isArray(taskGroup[cellId])) {
//             (taskGroup[cellId] as TaskString[]).push(taskPart);
//           } else {
//             taskGroup[cellId] = [taskGroup[cellId] as TaskString, taskPart];
//           }
  
//           // Move to the next day
//           currentDate.setDate(currentDate.getDate() + 1);
//           currentDate.setHours(0, 0, 0, 0);
//         }
//       }
//     });
  
//     return taskGroup;
//   }


