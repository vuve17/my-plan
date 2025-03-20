"use server";

import { createAccessKey, createRefreshKey } from "@/app/lib/key-handlers";
import type { KeysInDb, RegisterParams } from "@/app/lib/types";
import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req: Request): Promise<NextResponse<KeysInDb>> {
  const body = await req.json();

  const { email, username, password }: RegisterParams = await {
    ...body,
  };

  const client = await db.connect();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await client.sql`
              SELECT id FROM users WHERE name = ${email};
            `;

    if (userExists.rows.length > 0) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    console.log("match");
    await client.sql`
            INSERT INTO users (name, email, password)
              VALUES (${username}, ${email}, ${hashedPassword})
              ON CONFLICT (email) DO NOTHING;`;

    const getUser = await client.sql`
              SELECT id FROM users WHERE email = ${email};`;

    const userId = getUser.rows[0].id;

    if (!userId || userId == undefined) {
      return NextResponse.json(
        { message: "user doesn t exist" },
        { status: 401 }
      );
    }

    const newUserAchievements = await client.sql`
            SELECT id FROM Achievements
            `;

    newUserAchievements.rows.forEach(async (row) => {
      await client.sql`INSERT INTO user_Achievements ( achievement_id, User_id ) VALUES (${row.id}, ${userId})`;
    });

    const accessKey = await createAccessKey(userId);
    const refreshKey = await createRefreshKey(userId);

    if (!refreshKey.success || !accessKey.success) {
      return NextResponse.json(
        { message: "error creating keys" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { refreshToken: refreshKey.token, accessToken: accessKey.token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "error 500" }, { status: 500 });
  } finally {
    client.release();
  }
}

// async function AddInitialAchievemts(userId: string,  AchievementId: number) {
//   const query = `INSERT INTO user_Achievements ( Achievement_id, User_id ) VALUES (${AchievementId}, ${userId})`
//   return await query
// }
