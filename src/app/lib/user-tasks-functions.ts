"use client";

import Cookies from "js-cookie";
import {
  Task,
  TaskString,
  UserTasksStringValuePairFormat,
  UserTasksValuePairFormat,
  TaskType,
  setTasksInterface,
} from "@/app/lib/types";
import { getCellIdFromTask, getCellIdFromStringTask } from "./date-functions";

export const dynamic = "force-dynamic";

interface returnedTasks {
  tasks: UserTasksValuePairFormat;
  fullTasks: TaskString[];
  status: number;
}

export function splitSingleTaskByDays(task: Task): Task[] {
  const splitTasks: Task[] = [];
  let currentStart = new Date(task.startDate);
  const end = new Date(task.endDate);

  while (currentStart < end) {
    const nextMidnight = new Date(currentStart);
    nextMidnight.setHours(23, 59, 59, 999); // End of the current day

    // Create a task slice
    const taskChunk: Task = {
      ...task,
      startDate: currentStart,
      endDate: nextMidnight < end ? nextMidnight : end,
    };

    splitTasks.push(taskChunk);

    // Move the start to the next day at midnight
    currentStart = new Date(nextMidnight);
    currentStart.setHours(0, 0, 0, 0); // Start of the next day
    currentStart.setDate(currentStart.getDate() + 1); // Increment day
  }

  return splitTasks;
}

function getDateDifference(date1: Date, date2: Date): number {
  const startOfDay1 = new Date(date1);
  startOfDay1.setHours(0, 0, 0, 0);

  const startOfDay2 = new Date(date2);
  startOfDay2.setHours(0, 0, 0, 0);

  const diffInTime = startOfDay2.getTime() - startOfDay1.getTime();
  const diffInDays = Math.abs(diffInTime / (1000 * 60 * 60 * 24));

  return diffInDays;
}

export function pushSingleTaskObjectFromArray (taskGroups: {
  [key: number | string ]: Task | Task[];
}){
  Object.keys(taskGroups).forEach((key) => {
    if (Array.isArray(taskGroups[key]) && taskGroups[key].length === 1) {
      taskGroups[key] = taskGroups[key][0];
    }
  });
}

export function splitMultipleTasksByDaysTest(tasks: Task[]): Task[] {
  let minDate = Infinity;
  let maxDate = -Infinity;

  tasks.forEach((task) => {
    const taskStart = new Date(task.startDate).getTime();
    const taskEnd = new Date(task.endDate).getTime();

    if (taskStart < minDate) minDate = taskStart;
    if (taskEnd > maxDate) maxDate = taskEnd;
  });

  const startOfMinDate = new Date(minDate);
  startOfMinDate.setHours(0, 0, 0, 0);
  const startOfMaxDate = new Date(maxDate);
  startOfMaxDate.setHours(0, 0, 0, 0);

  const totalDays =
    Math.ceil(
      (startOfMaxDate.getTime() - startOfMinDate.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  console.log(startOfMinDate, startOfMaxDate);
  console.log(totalDays);

  let daySplitGroups: Task[][] = Array.from({ length: totalDays }, () => []);

  tasks.forEach((task) => {
    const splitTasks: Task[] = splitSingleTaskByDays(task);

    splitTasks.forEach((splitTask) => {
      // console.log("minDate:", new Date(minDate));
      // console.log("minDate 2 :", new Date(splitTask.startDate));
      const diff = getDateDifference(new Date(minDate), splitTask.startDate);
      // console.log("diff:", diff);

      daySplitGroups[diff].push(splitTask);
    });
  });

  const result = daySplitGroups.map((group) =>
    group.length === 1 ? group[0] : group
  );

  console.log("result:", result);
  return result as Task[];
}

export function validateTaskTypeField(taskType: string): taskType is TaskType {
  return taskType === "event" || taskType === "chore";
}

export function isTask(task: any): task is Task {
  return (
    task &&
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    task.startDate instanceof Date &&
    task.endDate instanceof Date &&
    typeof task.description === "string" &&
    typeof task.taskType === "string"
  );
}

export function isTaskString(task: any): task is TaskString {
  return (
    task &&
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    typeof task.startDate === "string" &&
    typeof task.endDate === "string" &&
    typeof task.description === "string" &&
    typeof task.taskType === "string"
  );
}

export function convertTaskToTaskString(tasks: Task | Task[]) {
  if (Array.isArray(tasks)) {
    const tasksFormated = tasks.map((t: Task) => ({
      ...t,
      startDate: new Date(t.startDate).toISOString(),
      endDate: new Date(t.endDate).toISOString(),
    }));
    return tasksFormated;
  } else {
    const taskFormated = {
      ...tasks,
      startDate: new Date(tasks.startDate).toISOString(),
      endDate: new Date(tasks.endDate).toISOString(),
    };
    return taskFormated;
  }
}

export function convertSingleTaskStringToTask(task: TaskString) {
  const taskFormated = {
    ...task,
    startDate: new Date(task.startDate),
    endDate: new Date(task.endDate),
    taskType: validateTaskTypeField(task.taskType) ? task.taskType : "event",
  };
  return taskFormated;
}

export function convertTaskArrayToTaskArrayString(tasks: Task[]): Promise<TaskString[]> {
  const taskArray: TaskString[] = []
  tasks.map((task) => {
    const taskFormated = {
      ...task,
      startDate: new Date(task.startDate).toISOString(),
      endDate: new Date(task.endDate).toISOString(),
    };
    taskArray.push(taskFormated)
  })
  console.log("taskArray; ", taskArray)
  return taskArray;
}

export function convertSingleTaskToTaskString(task: Task) {
  const taskFormated = {
    ...task,
    startDate: new Date(task.startDate).toISOString(),
    endDate: new Date(task.endDate).toISOString(),
  };
  return taskFormated;
}

export function convertTaskStringToTask(tasks: TaskString | TaskString[]) {
  if (Array.isArray(tasks)) {
    const tasksFormated = tasks.map((t: TaskString) => ({
      ...t,
      startDate: new Date(t.startDate),
      endDate: new Date(t.endDate),
      taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event",
    }));
    return tasksFormated;
  } else {
    const taskFormated = convertSingleTaskStringToTask(tasks);
    return taskFormated;
  }
}

export function convertTaskToTaskStringValuePair(
  tasks: UserTasksValuePairFormat
) {
  const parsedTasks: UserTasksStringValuePairFormat = {};
  Object.entries(tasks).forEach(([key, task]) => {
    if (Array.isArray(task)) {
      parsedTasks[key] = task.map((t: Task) => ({
        ...t,
        startDate: new Date(t.startDate).toISOString(),
        endDate: new Date(t.endDate).toISOString(),
      }));
    } else {
      parsedTasks[key] = convertSingleTaskToTaskString(task);
    }
  });
  console.log("parsed Tasks: ", parsedTasks)
  return parsedTasks;
}

export const convertTaskStringToTaskValuePair = (
  tasks: UserTasksStringValuePairFormat
): UserTasksValuePairFormat | null => {
  const parsedTasks: UserTasksValuePairFormat = {};
  if (!tasks || Object.keys(tasks).length === 0) {
    return null;
  }
  Object.entries(tasks).forEach(([key, task]) => {
    if (Array.isArray(task)) {
      parsedTasks[key] = task.map((t: TaskString) => ({
        ...t,
        startDate: new Date(t.startDate),
        endDate: new Date(t.endDate),
        taskType: validateTaskTypeField(t.taskType) ? t.taskType : "event",
      }));
    } else {
      parsedTasks[key] = {
        ...task,
        startDate: new Date(task.startDate),
        endDate: new Date(task.endDate),
        taskType: validateTaskTypeField(task.taskType)
          ? task.taskType
          : "event",
      };
    }
  });
  return parsedTasks;
};

export function formatJsonWithCellIds(tasks: UserTasksStringValuePairFormat) {
  const taskGroup: UserTasksStringValuePairFormat = {};
  Object.entries(tasks).forEach(([key, value]) => {
    const cellId = getCellIdFromStringTask(
      Array.isArray(value) ? value[0] : value
    );
    taskGroup[cellId] = Array.isArray(value) ? value : value;
  });
  console.log("taskGroup: ", taskGroup);
  return taskGroup;
}

export function getTaskById(fullTasks: TaskString[] | null, id: number): TaskString | null {
  if (fullTasks !== null) {
      return fullTasks.find((task) => task.id === id) || null;
  }
  return null;
}

export function confirmTaskType(task: any): task is Task {
  return (
    task &&
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    task.startDate instanceof Date &&
    task.endDate instanceof Date &&
    typeof task.description === "string" &&
    (task.taskType === "event" || task.taskType === "chore")
  );
}
export async function getTasks(): Promise<setTasksInterface | undefined> {
  const token = Cookies.get("refreshToken");
  const response = await fetch("/api/get-tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data: returnedTasks = await response.json();
    if (data.hasOwnProperty("tasks")) {
      const tasks = convertTaskToTaskStringValuePair(data.tasks);
      // const fullTasks = convertTaskToTaskStringValuePair(data.fullTasks);
      console.log("tasks: get tasks initial !", tasks);
      const formatedTasks: UserTasksStringValuePairFormat | null = tasks
        ? formatJsonWithCellIds(tasks)
        : null;
      console.log("formatedTasks with  formatJsonWithCellIds: ", formatedTasks);
      return {formatedTasks : formatedTasks, fullTasks: data.fullTasks};
    }
  } else {
    console.error("failed to fetch tasks");
  }
}

export function isTaskExpandingTroughoutMultipleDays(task: Task) {
  const startDate = new Date(task.startDate);
  const endDate = new Date(task.startDate);
  if (endDate.getDay() - startDate.getDay() > 0) {
    console.log("more then 1 day, expland");
  } else {
    return false;
  }
}

export function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
