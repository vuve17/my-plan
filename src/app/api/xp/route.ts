'use server'

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../lib/auth";
import { getUserAchievements } from "@/app/lib/achievement-requirements";
import { db } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {

    const authorizationHeader = request.headers.get('Authorization');
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "").trim() : null;

    if (!token) {
      return NextResponse.json(
        { message: "No valid token found" },
        { status: 400 }
      );
    }

    const userId = await getUserId(token);
    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const client = await db.connect();
    const userXpQuery = `
      SELECT xp from users WHERE id = $1
    `;

    const userXp = await client.query(userXpQuery, [userId])

    console.log("userXpQuery: ", userXp.rows[0].xp)
    client.release()
    return NextResponse.json(
      { xp: userXp.rows[0].xp },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "get user xp error 500" },
      { status: 500 }
    );
  }
}
