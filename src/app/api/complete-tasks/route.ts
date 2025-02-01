"use server";

import { getUserId } from "@/app/lib/auth"; // Your user authentication helper
import { db } from "@vercel/postgres"; // Vercel Postgres integration
import { NextRequest, NextResponse } from "next/server"; // Next.js server types
import { headers } from "next/headers"; // To get headers for token
import {
  ProcessedTaskString,
  Task,
  TaskString,
  TaskType,
} from "@/app/lib/types"; // Assuming this type exists for tasks
import { addUserTaskXp } from "@/app/lib/user-level-functions";
import { checkNewAchievements } from "@/app/lib/achievement-requirements";
// update tasks
// set processed = false
// where processed = true

export async function GET(request: NextRequest) {
  const client = await db.connect();

  const authorizationHeader = headers().get("authorization");
  const token = authorizationHeader
    ? authorizationHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 400 });
  }

  const userId = await getUserId(token);
  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  try {
    const dailyCheckTasksQuery = await client.sql<{
      daily_check_tasks: boolean;
    }>`
    SELECT daily_check_tasks FROM users 
    WHERE id = ${userId}
    `;

    // console.log("dailyCheckTasksQuery: ", dailyCheckTasksQuery.rows);
    const dailyCheckTasks = dailyCheckTasksQuery.rows[0].daily_check_tasks;

    if (!dailyCheckTasks) {
      const result = await client.sql<ProcessedTaskString[]>`
      SELECT * FROM tasks 
      WHERE user_id = ${userId} 
      AND end_date < NOW() 
      AND processed = false
      ORDER BY end_date DESC;
    `;
      // console.log("tasks: ", result.rows)
      if (result.rowCount === 0) {
        return NextResponse.json({ tasks: [] });
      }

      const tasks: Task[] = result.rows.map((task: any) => ({
        id: task.id,
        title: task.title,
        startDate: new Date(task.start_date),
        endDate: new Date(task.end_date),
        description: task.description,
        taskType: task.task_type as TaskType,
        processed: task.processed,
      }));

      return NextResponse.json({ tasks: tasks });
    } else {
      return NextResponse.json({ tasks: [] });
    }
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { message: "Error retrieving tasks" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

export async function POST(request: NextRequest) {
  const client = await db.connect();

  try {
    const { taskIds, completedTaskIds, tasks } = await request.json();
    const authorizationHeader = request.headers.get("authorization");
    const token = authorizationHeader
      ? authorizationHeader.replace("Bearer ", "")
      : null;

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 400 });
    }

    const userId = await getUserId(token);
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const query = `
      UPDATE tasks
      SET processed = true
      WHERE user_id = $1 AND id = ANY($2::int[])
      RETURNING id, title, description, processed;
    `;
    const result = await client.query(query, [userId, taskIds]);

    const query2 = `
    UPDATE tasks
    SET completed = true
    WHERE user_id = $1 AND id = ANY($2::int[])
    RETURNING id, title, description, processed;
  `;
    await client.query(query2, [userId, completedTaskIds]);

    for (const completedTaskId of completedTaskIds) {
      const task = tasks.find(
        (task: TaskString) => task.id === completedTaskId
      );
      if (task) {
        await addUserTaskXp(task, userId, client);
      }
    }

    const query3 = `
    UPDATE users
    SET daily_check_tasks = true
    WHERE id = $1
  `;
    const result3 = await client.query(query3, [userId]);

    const newAchievements = await checkNewAchievements(userId);
    return NextResponse.json({
      tasks: result.rows,
      achievements: newAchievements,
    });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return NextResponse.json(
      { message: "Error updating tasks" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
