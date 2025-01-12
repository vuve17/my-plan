"use server";

import { getUserId } from "@/app/lib/auth";
import { Achievement, Task, TaskString, UserAchievement } from "./types";
import { VercelPoolClient } from "@vercel/postgres";

function calculateXpBasedOnTask(task: TaskString): number {
  const startDate = new Date(task.startDate);
  const endDate = new Date(task.endDate);
  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  console.log("hours: ", hours);
  let xp = 0;
  if (task.taskType === "chore") {
    xp = hours * 2;
  } else if (task.taskType === "event") {
    xp = hours * 1;
  }

  return Math.round(xp);
}

function calculateXpBasedOnAchievement(achievement: UserAchievement): number {
  if (achievement.stars === 1) {
    return 50;
  } else if (achievement.stars === 2) {
    return 100;
  } else if (achievement.stars === 3) {
    return 200;
  } else {
    return 0;
  }
}

export async function addUserTaskXp(
  task: TaskString,
  userId: string,
  client: VercelPoolClient
) {
  console.log("provided: ", task, userId);
  const xp = calculateXpBasedOnTask(task);
  console.log("calculated xp: ", xp);
  console.log(`addUserTaskXp of task ${task.title} xp: `, xp);
  const query = `
  UPDATE users
  SET xp = xp + $1
  WHERE id = $2;
  `;
  await client.query(query, [xp, userId]);
}

export async function addUserAchievementXp(
  achievement: UserAchievement,
  userId: string,
  client: VercelPoolClient
) {
  const xp = calculateXpBasedOnAchievement(achievement);
  console.log("addUserAchievementXp xp: ", xp);
  await client.sql`
  UPDATE users
  SET xp = xp + ${xp}
  WHERE id = ${userId};
  `;
}

export async function removeUserXp(
  task: TaskString,
  userId: string,
  client: VercelPoolClient
) {
  const xp = calculateXpBasedOnTask(task);
  console.log("xp: ", xp);
  await client.sql`
  UPDATE users
  SET xp = xp - ${xp}
  WHERE id = ${userId};
  `;
}
