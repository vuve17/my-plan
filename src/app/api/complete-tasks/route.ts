"use server";

import { getUserId } from "@/app/lib/auth";  // Your user authentication helper
import { db } from "@vercel/postgres";  // Vercel Postgres integration
import { NextRequest, NextResponse } from "next/server";  // Next.js server types
import { headers } from "next/headers";  // To get headers for token
import { ProcessedTaskString } from "@/app/lib/types";  // Assuming this type exists for tasks

export async function GET(request: NextRequest) {
  const client = await db.connect();
  
  const authorizationHeader = headers().get("authorization");
  const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 400 });
  }

  const userId = await getUserId(token);
  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  try {
    const result = await client.sql<ProcessedTaskString[]>`
      SELECT * FROM tasks 
      WHERE user_id = ${userId} 
      AND end_date < NOW() 
      AND processed = false
      ORDER BY end_date DESC;
    `;
    console.log("tasks: ", result.rows)
    if (result.rowCount === 0) {
      return NextResponse.json({ tasks: [] });
    }

    return NextResponse.json({ tasks: result.rows });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json({ message: "Error retrieving tasks" }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST(request: NextRequest) {
  const client = await db.connect();

  try {
    // Parse request body
    const taskIds: number[] = await request.json();
    const authorizationHeader = headers().get("authorization");
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;

    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 400 });
    }

    const userId = await getUserId(token);
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if(taskIds.length === 0){
      return NextResponse.json({ message: "No tasks were provided", tasks: [] });
    }

    console.log("taskId: ", taskIds)

    const query = `
      UPDATE tasks
      SET processed = true
      WHERE user_id = $1 AND id = ANY($2)
      RETURNING id, title, description, processed;
    `;

    const result = await client.query(query,
      [userId, taskIds]
      );

    console.log("query result comete tasks: ", result);
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "No tasks were updated", tasks: [] });
    }

    return NextResponse.json({ message: "Tasks updated successfully", tasks: result.rows });
  } catch (error) {
    console.error("Error updating tasks:", error);
    return NextResponse.json({ message: "Error updating tasks" }, { status: 500 });
  } finally {
    client.release();
  }
}