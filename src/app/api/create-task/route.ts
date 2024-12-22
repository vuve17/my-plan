"use server";

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { UserAchievement, Task } from "@/app/lib/types";
import { headers } from "next/headers";
import { checkHustler, checkEarlyBird, checkLateNightGrind, checkMorningRoutine, checkOverworking, checkPartyParty, checkTest,checkStarCollector, checkWorkWorkAndMoreWork } from "@/app/lib/achievement-requirements";

export async function POST(request: NextRequest) {
  const client = await db.connect();
  const body = await request.json();
  const { title, startDate, endDate, description, taskType } = await {
    ...body,
  };

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

  await client.sql`
    INSERT INTO tasks (title, start_date, end_date, description, user_id, task_type)
    VALUES 
    (${title}, ${startDate}, ${endDate}, ${description}, ${userId}, ${taskType});
    `;
  const achievements: UserAchievement[] = await checkNewAchievements(userId);
  return NextResponse.json(
    { message: "created", achievements: achievements },
    { status: 201 }
  );
}


async function checkNewAchievements(userId: string): Promise<UserAchievement[]> {
  // Fetch current user achievements
  const userAchievements = await getUserAchievements(userId);
  // console.log("userAchievements: ", userAchievements);

  // Initialize an array to collect new/updated achievements
  const newAchievements: UserAchievement[] = [];

  // Define a map of achievement names to their respective checker functions
  const achievementCheckers = {
    Hustler: checkHustler,
    EarlyBird: checkEarlyBird,
    LateNightGrind: checkLateNightGrind,
    MorningRoutine: checkMorningRoutine,
    Overworking: checkOverworking,
    PartyParty: checkPartyParty,
    StarCollector: checkStarCollector,
    WorkWorkAndMoreWork: checkWorkWorkAndMoreWork,
    Test: checkTest
  };

  // Iterate over each achievement and check if it has been updated
  for (const achievement of userAchievements) {
    const checkerFunction = achievementCheckers[achievement.name];

    // If a valid checker function exists, call it
    if (checkerFunction) {
      // console.log("achievement with user id?", achievement)
      const isNew = await checkerFunction(achievement);

      // If the achievement was updated (new star level), add it to the new achievements array
      if (isNew) {
        // console.log("new achievement")
        newAchievements.push(achievement);
      }
    }
  }
  return newAchievements;
}


export async function getUserAchievements(userId:string) {
    const client = await db.connect()
    const result = await client.sql`
        SELECT user_achievements.id as id, user_id, name, image, description, stars 
            FROM user_achievements JOIN achievements
            ON achievements.id = user_achievements.achievement_id
            WHERE User_id = ${userId}
    `;
    const achievements: UserAchievement[] = result.rows as UserAchievement[];
    return achievements;
}

