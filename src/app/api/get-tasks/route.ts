'use server'

import { NextRequest, NextResponse } from "next/server";
import { db, QueryResultRow } from "@vercel/postgres";
import { getUserId } from "@/app/lib/auth";
import type { Task } from '@/app/lib/types';
import { confirmTaskType } from "@/app/lib/user-tasks-functions";


function isOverlapping(taskA: Task, taskB: Task): boolean {
    return taskA.startDate < taskB.endDate && taskA.endDate > taskB.startDate;
}

function sortTasksByHours(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

function formatTasksByTimeOverlap(tasks: QueryResultRow) {
    const taskGroups: { [key: number]: Task | Task[] } = {};
    const taskList = tasks;
    const processed: Set<number> = new Set();
    
    taskList.forEach((task: Task, index: number) => {
        if (!processed.has(task.id)) {
            const overlappingTasks: Task[] = [];
            
            for (let j = index + 1; j < taskList.length; j++) {
                const otherTask = taskList[j];
                if (isOverlapping(task, otherTask)) {
                    overlappingTasks.push(otherTask);
                    processed.add(otherTask.id);
                }
            }
            if (overlappingTasks.length > 0) {
                const taskArray = [task, ...overlappingTasks];
                const sortedTaskArray = sortTasksByHours(taskArray)
                taskGroups[task.id] = sortedTaskArray;
            } else {
                taskGroups[task.id] = task;
            }
        }
    });

    return taskGroups;
}

export async function GET(request: NextRequest) {
    const client = await db.connect();
    const authorizationHeader = request.headers.get('Authorization');
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;
    
    console.log("Token received in backend:", token);

    if(token) {
        const userId = await getUserId(token);
        const tasks = await client.sql`
            SELECT id, title, start_date as "startDate", end_date as "endDate", description, task_type as "taskType"
            FROM tasks
            WHERE user_id = ${userId}
        `;
        console.log(tasks.rows);
        
        const jsonFormattedTasks =  formatTasksByTimeOverlap(tasks.rows);
        console.log("jsonFormattedTasks: backend : ", jsonFormattedTasks);

        
        return NextResponse.json({tasks : jsonFormattedTasks}, {status: 200});
    } else {
        return NextResponse.json({ error: 'Unauthorized - Missing or invalid token' }, { status: 401 });
    }
}
