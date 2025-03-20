"use server";

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { UserAchievement } from "@/app/lib/types";
import { headers } from "next/headers";
import { checkNewAchievements } from "@/app/lib/achievement-requirements";


export async function POST(request: NextRequest) {
  const client = await db.connect();
  const body = await request.json();
  const { title, startDate, endDate, description, taskType } = await {
    ...body,
  };

  console.log("body: ", body);

  const authorizationHeader = headers().get("authorization");
  const token = authorizationHeader
    ? authorizationHeader.replace("Bearer ", "")
    : null;

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 400 });
  }
  console.log("token: ", token);
  const userId = await getUserId(token);
  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }
  console.log("usrId: ", userId);
 const inserted =  await client.sql`
    INSERT INTO tasks (title, start_date, end_date, description, user_id, task_type)
    VALUES 
    (${title}, ${startDate}, ${endDate}, ${description}, ${userId}, ${taskType});
    `;
  // const achievements = []
  const achievements: UserAchievement[] = await checkNewAchievements(userId);
  console.log("achievements: ", achievements);

  return NextResponse.json(
    { message: "created", achievements: achievements },
    { status: 201 }
  );
}