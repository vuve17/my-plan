"use server";

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../../lib/auth";
import { getUserAchievements } from "@/app/lib/achievement-requirements";

export async function GET(request: NextRequest) {
  try {
    const refreshCookie = request.headers.get("refreshToken");
    const accessCookie = request.headers.get("accessToken");

    const token = refreshCookie || accessCookie;
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
    const achievementsArray = await getUserAchievements(userId);
    return NextResponse.json(
      { achievementsArray: achievementsArray },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "achievements error 500" },
      { status: 500 }
    );
  }
}
