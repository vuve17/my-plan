"use server";

import { UserAchievement } from "@/app/lib/types";
import { db } from "@vercel/postgres";

export async function checkHustler(
  currentAch: UserAchievement
): Promise<boolean> {
  if (currentAch.stars == 3) return false;
  const client = await db.connect();
  const countQuery = await client.sql`
      SELECT COUNT(*) as cnt from tasks WHERE user_id = ${currentAch.user_id}
  `;
  const count = countQuery.rows[0].cnt;

  if (currentAch.stars == 0 && count >= 5) {
    await client.sql` 
      Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
      `;
    currentAch.stars = 1;
    return true;
  } else if (currentAch.stars == 1 && count >= 10) {
    await client.sql` 
    Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
    `;
    currentAch.stars = 2;
    return true;
  } else if (currentAch.stars == 2 && count >= 15) {
    await client.sql` 
    Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
    `;
    currentAch.stars = 3;
    return true;
  }
  return false;
}


export async function checkTest(
  currentAch: UserAchievement
): Promise<boolean> {
  console.log("CHECKING TEST")
  if (currentAch.stars == 3) return false;
  const client = await db.connect();
  console.log("user id from achievement: ", currentAch.user_id)
  const query =   `SELECT COUNT(*) as cnt FROM tasks WHERE user_id = $1`
  const result = await client.query(query, [currentAch.user_id]);
  const count = await parseInt(result.rows[0].cnt, 10); 
  console.log("count : ", count)

  if (currentAch.stars == 0 && count >= 1) {
    console.log("bigger than 1")
    const query =   `Update user_achievements SET stars = 1 where id = $1`
    const result = await client.query(query, [currentAch.id]);
    console.log(result)
    currentAch.stars = 1;
    return true;
  } else if (currentAch.stars == 1 && count >= 10) {
    const query =   `Update user_achievements SET stars = 2 where id = $1`
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 2;
    return true;
  } else if (currentAch.stars == 2 && count >= 15) {
    const query =   `Update user_achievements SET stars = 3 where id = $1`
    const result = await client.query(query, [currentAch.id]);
    currentAch.stars = 3;
    return true;
  }
  return false;
}


// Utility function to update user achievements
async function updateAchievement(client: any, stars: number, id: number): Promise<void> {
  const query = `UPDATE user_achievements SET stars = $1 WHERE id = $2`;
  await client.query(query, [stars, id]);
}

// Common function to count tasks
async function getTaskCount(client: any, query: string, params: any[]): Promise<number> {
  const result = await client.query(query, params);
  return parseInt(result.rows[0].cnt, 10);
}

// Check PartyParty achievement
export async function checkPartyParty(currentAch: UserAchievement): Promise<boolean> {
  if (currentAch.stars === 3) return false;
  const client = await db.connect();
  try {
    const countQuery = `
      SELECT COUNT(*) as cnt 
      FROM tasks 
      WHERE user_id = $1 AND type = 'event'
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
export async function checkEarlyBird(currentAch: UserAchievement): Promise<boolean> {
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
export async function checkLateNightGrind(currentAch: UserAchievement): Promise<boolean> {
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
export async function checkWorkWorkAndMoreWork(currentAch: UserAchievement): Promise<boolean> {
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
export async function checkOverworking(currentAch: UserAchievement): Promise<boolean> {
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
export async function checkMorningRoutine(currentAch: UserAchievement): Promise<boolean> {
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
export async function checkStarCollector(currentAch: UserAchievement): Promise<boolean> {
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



// here

// export async function checkOverworking(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();

//   const choreCountQuery = await client.sql`
//     SELECT COUNT(*) as cnt 
//     FROM tasks 
//     WHERE user_id = ${currentAch.user_id} 
//     AND completed = true 
//     AND task_type = 'chore' 
//     AND start_date >= DATE_TRUNC('week', NOW());
//   `;
//   const choreCount = choreCountQuery.rows[0].cnt;

//   if (choreCount >= 5 && currentAch.stars == 0) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 1 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 1;
//     return true;
//   } else if (choreCount >= 10 && currentAch.stars == 1) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 2 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (choreCount >= 20 && currentAch.stars == 2) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 3 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }

// export async function checkMorningRoutine(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();

//   const weeklyTasksQuery = await client.sql`
//     SELECT COUNT(*) as total_tasks, 
//            SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) as completed_tasks
//     FROM tasks 
//     WHERE user_id = '${currentAch.user_id}' 
//     AND start_date >= DATE_TRUNC('week', NOW());
//   `;

//   const { total_tasks, completed_tasks } = weeklyTasksQuery.rows[0];

//   if (total_tasks > 0 && total_tasks === completed_tasks) {
//     if (total_tasks >= 5 && currentAch.stars == 0) {
//       await client.sql`
//         UPDATE user_achievements 
//         SET stars = 1 
//         WHERE id = '${currentAch.id}';
//       `;
//       currentAch.stars = 1;
//       return true;
//     } else if (total_tasks >= 10 && currentAch.stars == 1) {
//       await client.sql`
//         UPDATE user_achievements 
//         SET stars = 2 
//         WHERE id = '${currentAch.id}';
//       `;
//       currentAch.stars = 2;
//       return true;
//     } else if (total_tasks >= 15 && currentAch.stars == 2) {
//       await client.sql`
//         UPDATE user_achievements 
//         SET stars = 3 
//         WHERE id = '${currentAch.id}';
//       `;
//       currentAch.stars = 3;
//       return true;
//     }
//   }
//   return false;
// }

// export async function checkStarCollector(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();

//   const choreCountQuery = await client.sql`
// SELECT COALESCE(SUM(stars), 0) as total_stars
// FROM user_achievements
// WHERE user_id = '${currentAch.user_id}';

//   `;
//   const starCount = choreCountQuery.rows[0].cnt;

//   if (starCount >= 10 && currentAch.stars == 0) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 1 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 1;
//     return true;
//   } else if (starCount >= 20 && currentAch.stars == 1) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 2 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (starCount >= 30 && currentAch.stars == 2) {
//     await client.sql`
//       UPDATE user_achievements 
//       SET stars = 3 
//       WHERE id = '${currentAch.id}';
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }

// 472cac5f-0eb9-4e95-b2ad-99a1075ae3a8

// SELECT COUNT(*) as cnt
// FROM tasks
// WHERE user_id = '472cac5f-0eb9-4e95-b2ad-99a1075ae3a8'
// AND EXTRACT(HOUR FROM start_date)::INT > 22
// AND EXTRACT(MINUTE FROM start_date)::INT = 0;



// export async function checkPartyParty(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();
//   const countQuery = await client.sql`
//       SELECT COUNT(*) as cnt from tasks WHERE user_id = '${currentAch.user_id}' AND type = 'event'
//   `;
//   const count = countQuery.rows[0].cnt;

//   if (currentAch.stars == 0 && count >= 5) {
//     await client.sql` 
//       Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//       `;
//     currentAch.stars = 1;
//     return true;
//   } else if (currentAch.stars == 1 && count >= 10) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (currentAch.stars == 2 && count >= 15) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }

// export async function checkEarlyBird(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();
//   const countQuery = await client.sql`
//   SELECT COUNT(*) as cnt 
//   FROM tasks 
//   WHERE user_id = ${currentAch.user_id} 
//   AND EXTRACT(HOUR FROM start_date)::INT < 7
//   AND EXTRACT(MINUTE FROM start_date)::INT = 0;
// `;
//   const count = countQuery.rows[0].cnt;
//   if (currentAch.stars == 0 && count >= 5) {
//     await client.sql` 
//       Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//       `;
//     currentAch.stars = 1;
//     return true;
//   } else if (currentAch.stars == 1 && count >= 10) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (currentAch.stars == 2 && count >= 15) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }

// export async function checkLateNightGrind(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();
//   const countQuery = await client.sql`
//   SELECT COUNT(*) as cnt 
//   FROM tasks 
//   WHERE user_id = ${currentAch.user_id} 
//   AND EXTRACT(HOUR FROM start_date)::INT > 22
//   AND EXTRACT(MINUTE FROM start_date)::INT = 0;
// `;
//   const count = countQuery.rows[0].cnt;
//   if (currentAch.stars == 0 && count >= 5) {
//     await client.sql` 
//       Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//       `;
//     currentAch.stars = 1;
//     return true;
//   } else if (currentAch.stars == 1 && count >= 10) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (currentAch.stars == 2 && count >= 15) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }

// // complete achievements

// export async function checkWorkWorkAndMoreWork(
//   currentAch: UserAchievement
// ): Promise<boolean> {
//   if (currentAch.stars == 3) return false;
//   const client = await db.connect();
//   const countQuery = await client.sql`
// SELECT COUNT(*) as cnt from tasks WHERE user_id = '${currentAch.user_id}' AND completed = 'true'
// `;
//   const count = countQuery.rows[0].cnt;
//   if (currentAch.stars == 0 && count >= 50) {
//     await client.sql` 
//       Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//       `;
//     currentAch.stars = 1;
//     return true;
//   } else if (currentAch.stars == 1 && count >= 100) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 2;
//     return true;
//   } else if (currentAch.stars == 2 && count >= 200) {
//     await client.sql` 
//     Update user_achievements SET stars = 1 where id = '${currentAch.id}' 
//     `;
//     currentAch.stars = 3;
//     return true;
//   }
//   return false;
// }
