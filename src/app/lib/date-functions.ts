'use client'

import type { Task, TaskString } from '@/app/lib/types';


//math.abs?y/n
export function getDifferenceInHoursAndMinutes(startDate: Date, endDate: Date) : { hours: number, minutes: number } {
    const differenceInMs = Math.abs(endDate.getTime() - startDate.getTime());
    const hours = Math.abs(Math.floor(differenceInMs / (1000 * 60 * 60)));
    const minutes =  Math.abs(Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)));
    // console.log("hours",hours, minutes)
    return { hours, minutes };
}

export function getChosenDateTime(divId: string) {
    const dateString = divId.indexOf("_");
    const dateBeforeUnderscore = divId.slice(0, dateString);
    const month = dateBeforeUnderscore.slice(0, 2);
    const day = dateBeforeUnderscore.slice(2, 4);
    const time = divId.slice(dateString + 1);
    const year = Number(dateBeforeUnderscore.slice(4, dateString));
    const date = new Date(year, +month - 1, +day, Number(time));
    return { date, time };
}

export function sortTasksByHours(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getCellIdFromTask(task: Task) {
    const taskHours = new Date(task.startDate).getHours();
    const taskStartDate = new Date(task.startDate);
    const cellId: string = `${(taskStartDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${taskStartDate.getDate()
      .toString()
      .padStart(2, "0")}${taskStartDate.getFullYear()}_${taskHours}`;
    return cellId;
}

export function getCellIdFromStringTask(task: TaskString) {
    const taskHours = new Date(task.startDate).getHours();
    const taskStartDate = new Date(task.startDate);
    const cellId: string = `${(taskStartDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${taskStartDate.getDate()
      .toString()
      .padStart(2, "0")}${taskStartDate.getFullYear()}_${taskHours}`;
    return cellId;
}


// export function isTaskExpandingTroughoutMultipleDays(startDate: Date, endDate: Date): number {
//     return endDate.getDay() - startDate.getDay()
// }

// export function checkForFlags(taskId: string): number | undefined{

// }