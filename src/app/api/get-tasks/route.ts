"use server";

import { NextRequest, NextResponse } from "next/server";
import { db, QueryResultRow } from "@vercel/postgres";
import { getUserId } from "@/app/lib/auth";
import type { Task } from "@/app/lib/types";
import { confirmTaskType } from "@/app/lib/user-tasks-functions";

function isOverlapping(taskA: Task, taskB: Task): boolean {
  return (
    // ako je pocetak taskA prije kraja taskaB i 
    // ako je kraj taska A nakon pocetka taskaB

    new Date(taskA.startDate) < new Date(taskB.endDate) &&
    new Date(taskA.endDate) > new Date(taskB.startDate)
  );
}

function sortTasksByHours(tasks: Task[]): Task[] {
  return tasks.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
}


function pushSingleTaskObjectFromArray (taskGroups: {
  [key: number | string ]: Task[];
}){
  Object.keys(taskGroups).forEach((key) => {
    if (Array.isArray(taskGroups[key]) && taskGroups[key].length === 1) {
      taskGroups[key] = taskGroups[key][0];
    }
  });
}

function formatTasksByTimeOverlap(tasks: QueryResultRow) {
  // console.log("formatTasksByTimeOverlap tasks", tasks);

  const taskGroups: { [key: number]: Task[] } = {};
  const processed: Set<number> = new Set();

  tasks.forEach((task: Task, index: number) => {
    if (!processed.has(task.id)) {
      const overlappingTasks: Task[] = [task]; // Start with the current task
      processed.add(task.id); // Mark the current task as processed

      // Check for overlapping tasks
      for (let j = index + 1; j < tasks.length; j++) {
        const otherTask = tasks[j];

        if (!processed.has(otherTask.id) && isOverlapping(task, otherTask)) {
          overlappingTasks.push(otherTask);
          processed.add(otherTask.id); // Mark as processed
        }
      }

      // Store overlapping tasks as a sorted group
      const sortedTaskArray = sortTasksByHours(overlappingTasks);
      taskGroups[task.id] = sortedTaskArray;
    }
  });

  pushSingleTaskObjectFromArray(taskGroups)

  console.log("formatTasksByTimeOverlap result: ", taskGroups);
  return taskGroups;
}


function splitSingleTaskByDays(task: Task): Task[] {
  const splitTasks: Task[] = [];
  let currentStart = new Date(task.startDate);
  const end = new Date(task.endDate);

  while (currentStart < end) {
    const nextMidnight = new Date(currentStart);
    nextMidnight.setHours(23, 59, 59, 999);

    const taskChunk: Task = {
      ...task,
      startDate: currentStart,
      endDate: nextMidnight < end ? nextMidnight : end,
    };

    splitTasks.push(taskChunk);

    currentStart = new Date(nextMidnight);
    currentStart.setHours(0, 0, 0, 0);
    currentStart.setDate(currentStart.getDate() + 1);
  }

  return splitTasks;
}

function splitMultipleTasksByDays(tasks: Task[]): Task[][] {
  // console.log("splitMultipleTasksByDays incoming tasks :", tasks);

  let daySplitGroups: Task[][] = [];

  for (let i = 0; i <= tasks.length; i++) {
    if (tasks[i]) {
      const splitTasks: Task[] = splitSingleTaskByDays(tasks[i]);
      splitTasks.forEach((splitTask) => {
        const taskStart = new Date(splitTask.startDate);
        const baseStart = new Date(tasks[0].startDate);
        baseStart.setHours(0, 0, 0, 0);

        const dayDifference = Math.floor(
          (taskStart.getTime() - baseStart.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (!daySplitGroups[dayDifference]) {
          daySplitGroups[dayDifference] = [];
        }
        daySplitGroups[dayDifference].push(splitTask);
      });
    }
  }
  // console.log("Final daySplitGroups:", daySplitGroups);
  return daySplitGroups;
}


function formatTasksByDayOverlap(tasks: { [key: number]: Task | Task[] }): {
  [key: number]: Task | Task[];
} {
  // console.log("tasks (final) initialy gotten tasks inside formatTasksByDayOverlap: ", tasks)
  const taskGroups: { [key: number]: Task | Task[] } = {};
  // console.log(Object.entries(tasks));
  Object.entries(tasks).forEach(([key, value], index) => {
    if (Array.isArray(value)) {
      // console.log("value", value);
      taskGroups[index] = value;
      const splitTaskGroups = splitMultipleTasksByDays(value);
      // console.log("splitTaskGroups: ", splitTaskGroups);
      splitTaskGroups.forEach((group, index) => {
        const newKey = `${key}_${index}`;
        taskGroups[index] = group;
      });
    } else {
      const splitTasks = splitSingleTaskByDays(value);
      // console.log("splitTask: ", splitTasks )
      splitTasks.forEach((splitTask, index) => {
        const newKey = `${key}_${index}`;
        taskGroups[newKey] = splitTask;
      });
    }
  });
  // console.log("taskGroups (final) inside formatTasksByDayOverlap: ", taskGroups)
  return taskGroups;
}

export async function GET(request: NextRequest) {
  const client = await db.connect();
  const authorizationHeader = request.headers.get("Authorization");
  const token = authorizationHeader
    ? authorizationHeader.replace("Bearer ", "")
    : null;
  if (token) {
    const userId = await getUserId(token);
    const tasks = await client.sql`
            SELECT id, title, start_date as "startDate", end_date as "endDate", description, task_type as "taskType"
            FROM tasks
            WHERE user_id = ${userId}
        `;
    // console.log(" fetched tasks :", tasks.rows)
    const jsonFormattedTasks = formatTasksByTimeOverlap(tasks.rows);
    // console.log("jsonFormattedTasksByHours", jsonFormattedTasks);
    const jsonFormattedTasksByDay = formatTasksByDayOverlap(jsonFormattedTasks);
    // console.log("jsonFormattedTasksByDay", jsonFormattedTasksByDay);
    return NextResponse.json(
      { 
        tasks: jsonFormattedTasksByDay,
        fullTasks: tasks.rows
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { error: "Unauthorized - Missing or invalid token" },
      { status: 401 }
    );
  }
}
