"use server";

import { UserAchievement } from "@/app/lib/types";
import { db } from "@vercel/postgres";
import { addUserAchievementXp } from "./user-level-functions";

export async function checkHustler(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING Hustler");
  if (currentAch.stars == 3) return false;
  const client = await db.connect();
  try {
    const query = `SELECT COUNT(*) as cnt FROM tasks WHERE user_id = $1`;
    const result = await client.query(query, [currentAch.user_id]);
    const count = parseInt(result.rows[0].cnt, 10);

    if (currentAch.stars == 0 && count >= 5) {
      const updateQuery = `UPDATE user_achievements SET stars = 1 WHERE id = $1`;
      await client.query(updateQuery, [currentAch.id]);
      currentAch.stars = 1;
      return true;
    } else if (currentAch.stars == 1 && count >= 10) {
      const updateQuery = `UPDATE user_achievements SET stars = 2 WHERE id = $1`;
      await client.query(updateQuery, [currentAch.id]);
      currentAch.stars = 2;
      return true;
    } else if (currentAch.stars == 2 && count >= 15) {
      const updateQuery = `UPDATE user_achievements SET stars = 3 WHERE id = $1`;
      await client.query(updateQuery, [currentAch.id]);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}
export async function checkTest(currentAch: UserAchievement): Promise<boolean> {
  console.log("CHECKING TEST");
  if (currentAch.stars == 3) return false;
  const client = await db.connect();
  console.log("user id from achievement: ", currentAch.user_id);
  const query = `SELECT COUNT(*) as cnt FROM tasks WHERE user_id = $1`;
  const result = await client.query(query, [currentAch.user_id]);
  const count = parseInt(result.rows[0].cnt, 10);
  console.log("count : ", count);

  if (currentAch.stars == 0 && count >= 1) {
    console.log("bigger than 1");
    const query = `Update user_achievements SET stars = 1 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    console.log("result update: ", result, "rows: ", result.rows);
    currentAch.stars = 1;
    return true;
  } else if (currentAch.stars == 1 && count >= 2) {
    const query = `Update user_achievements SET stars = 2 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 2;
    return true;
  } else if (currentAch.stars == 2 && count >= 3) {
    const query = `Update user_achievements SET stars = 3 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 3;
    return true;
  }
  return false;
}

export async function checkChoreMaster(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkChoreMaster");
  if (currentAch.stars == 3) return false;
  const client = await db.connect();
  console.log("user id from achievement: ", currentAch.user_id);
  const query = `SELECT COUNT(*) as cnt FROM tasks WHERE user_id = $1 AND task_type = 'chore'`;
  const result = await client.query(query, [currentAch.user_id]);
  const count = parseInt(result.rows[0].cnt, 10);
  console.log("count : ", count);

  if (currentAch.stars == 0 && count >= 5) {
    console.log("bigger than 1");
    const query = `Update user_achievements SET stars = 1 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    console.log("result update: ", result, "rows: ", result.rows);
    currentAch.stars = 1;
    return true;
  } else if (currentAch.stars == 1 && count >= 10) {
    const query = `Update user_achievements SET stars = 2 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 2;
    return true;
  } else if (currentAch.stars == 2 && count >= 20) {
    const query = `Update user_achievements SET stars = 3 where id = $1`;
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 3;
    return true;
  }
  return false;
}

// Utility function to update user achievements
async function updateAchievement(
  client: any,
  stars: number,
  id: number
): Promise<void> {
  const query = `UPDATE user_achievements SET stars = $1 WHERE id = $2`;
  await client.query(query, [stars, id]);
}

// Common function to count tasks
async function getTaskCount(
  client: any,
  query: string,
  params: any[]
): Promise<number> {
  const result = await client.query(query, params);
  return parseInt(result.rows[0].cnt, 10);
}

// Check PartyParty achievement
export async function checkPartyParty(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkPartyParty");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const countQuery = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 AND task_type = 'event'
    `;
    const count = await getTaskCount(client, countQuery, [currentAch.user_id]);

    if (currentAch.stars === 0 && count >= 5) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (currentAch.stars === 1 && count >= 10) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (currentAch.stars === 2 && count >= 15) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

// Check EarlyBird achievement
export async function checkEarlyBird(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkEarlyBird");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const countQuery = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 
      AND EXTRACT(HOUR FROM start_date)::INT < 7 
      AND EXTRACT(MINUTE FROM start_date)::INT = 0
    `;
    const count = await getTaskCount(client, countQuery, [currentAch.user_id]);

    if (currentAch.stars === 0 && count >= 5) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (currentAch.stars === 1 && count >= 10) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (currentAch.stars === 2 && count >= 15) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

// Check LateNightGrind achievement
export async function checkLateNightGrind(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkLateNightGrind");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const countQuery = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 
      AND EXTRACT(HOUR FROM start_date)::INT > 22 
      AND EXTRACT(MINUTE FROM start_date)::INT = 0
    `;
    const count = await getTaskCount(client, countQuery, [currentAch.user_id]);

    if (currentAch.stars === 0 && count >= 5) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (currentAch.stars === 1 && count >= 10) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (currentAch.stars === 2 && count >= 15) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

// Check WorkWorkAndMoreWork achievement
export async function checkWorkWorkAndMoreWork(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkWorkWorkAndMoreWork");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const countQuery = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 AND completed = TRUE
    `;
    const count = await getTaskCount(client, countQuery, [currentAch.user_id]);

    if (currentAch.stars === 0 && count >= 50) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (currentAch.stars === 1 && count >= 100) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (currentAch.stars === 2 && count >= 200) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

// Check Overworking Achievement
export async function checkOverworking(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkOverworking");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const query = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 
      AND completed = TRUE 
      AND task_type = 'chore' 
      AND start_date >= DATE_TRUNC('week', NOW())
    `;
    const result = await client.query(query, [currentAch.user_id]);
    const choreCount = parseInt(result.rows[0].cnt, 10);

    if (choreCount >= 5 && currentAch.stars === 0) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (choreCount >= 10 && currentAch.stars === 1) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (choreCount >= 20 && currentAch.stars === 2) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

// Check Morning Routine Achievement
export async function checkMorningRoutine(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkMorningRoutine");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const query = `
      SELECT COUNT(*) as total_tasks, 
             SUM(CASE WHEN completed = TRUE THEN 1 ELSE 0 END) as completed_tasks
      FROM tasks 
      WHERE user_id = $1 
      AND start_date >= DATE_TRUNC('week', NOW())
    `;
    const result = await client.query(query, [currentAch.user_id]);
    const { total_tasks, completed_tasks } = result.rows[0];

    if (total_tasks > 0 && total_tasks === completed_tasks) {
      if (total_tasks >= 5 && currentAch.stars === 0) {
        await updateAchievement(client, 1, currentAch.id);
        currentAch.stars = 1;
        return true;
      } else if (total_tasks >= 10 && currentAch.stars === 1) {
        await updateAchievement(client, 2, currentAch.id);
        currentAch.stars = 2;
        return true;
      } else if (total_tasks >= 15 && currentAch.stars === 2) {
        await updateAchievement(client, 3, currentAch.id);
        currentAch.stars = 3;
        return true;
      }
    }
    return false;
  } finally {
    client.release();
  }
}

// Check Star Collector Achievement
export async function checkStarCollector(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING checkStarCollector");

  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const query = `
      SELECT COALESCE(SUM(stars), 0) as total_stars
      FROM user_achievements
      WHERE user_id = $1
    `;
    const result = await client.query(query, [currentAch.user_id]);
    const starCount = parseInt(result.rows[0].total_stars, 10);

    if (starCount >= 10 && currentAch.stars === 0) {
      await updateAchievement(client, 1, currentAch.id);
      currentAch.stars = 1;
      return true;
    } else if (starCount >= 20 && currentAch.stars === 1) {
      await updateAchievement(client, 2, currentAch.id);
      currentAch.stars = 2;
      return true;
    } else if (starCount >= 30 && currentAch.stars === 2) {
      await updateAchievement(client, 3, currentAch.id);
      currentAch.stars = 3;
      return true;
    }
    return false;
  } finally {
    client.release();
  }
}

export async function checkNewAchievements(
  userId: string
): Promise<UserAchievement[]> {
  console.log("CHECKING checkNewAchievements");

  const userAchievements = await getUserAchievements(userId);
  // console.log("userAchievements: ", userAchievements);

  const newAchievements: UserAchievement[] = [];
  const achievementCheckers: {
    [key: string]: (currentAch: UserAchievement) => Promise<boolean>;
  } = {
    Hustler: checkHustler,
    "Early Bird": checkEarlyBird,
    LateNightGrind: checkLateNightGrind,
    "Morning Routine": checkMorningRoutine,
    Overworking: checkOverworking,
    "Party Party": checkPartyParty,
    "Star Collector": checkStarCollector,
    "Work Work Work And More Work": checkWorkWorkAndMoreWork,
    "Chore Master": checkChoreMaster,
    Test: checkTest,
    "Late Night Grind": checkLateNightGrind,
  };

  for (const achievement of userAchievements) {
    console.log("const achievement of userAchievements: ", achievement.name);

    const checkerFunction = achievementCheckers[achievement.name];

    if (checkerFunction) {
      const isNew = await checkerFunction(achievement);

      if (isNew) {
        console.log("new achievement!!!!", achievement);
        newAchievements.push(achievement);
      }
    }
  }
  if (newAchievements.length !== 0) {
    const client = await db.connect();
    for (const achievement of newAchievements) {
      await addUserAchievementXp(achievement, userId, client);
    }
    client.release();
  }

  console.log("newAchievements array?: ", newAchievements);
  return newAchievements;
}

export async function getUserAchievements(userId: string) {
  const client = await db.connect();
  const result = await client.sql`
      SELECT user_achievements.id as id, user_id, name, image0, image1, image2, image3, description0, description1, description2, description3, stars 
          FROM user_achievements JOIN achievements
          ON achievements.id = user_achievements.achievement_id
          WHERE User_id = ${userId}
  `;
  const achievements: UserAchievement[] = result.rows as UserAchievement[];
  achievements.sort((a, b) => b.stars - a.stars);
  return achievements;
}
