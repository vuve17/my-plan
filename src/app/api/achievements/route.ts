'use server'

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from '../../lib/auth';
import { db } from '@vercel/postgres';
import { Achievement } from "@/app/lib/types";


async function getAchievements(userId:string) {
    console.log(" IN getAchievements ")
    const client = await db.connect()
    const result = await client.sql`
        SELECT * FROM achievements
        WHERE id IN (    
            SELECT Achievement_id FROM user_achievements
            WHERE User_id = ${userId}
        )
    `;
    const achievements: Achievement[] = result.rows as Achievement[];
    return achievements;
}

export async function GET(request: NextRequest) {
    try {
        const refreshCookie = request.headers.get('refreshToken');
        const accessCookie = request.headers.get('accessToken');

        const token = refreshCookie || accessCookie;
        if (!token) {
            return NextResponse.json({ message: "No valid token found" }, { status: 400 });
        }

        const userId = await getUserId(token);
        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
        const achievementsArray = await getAchievements(userId)
        // console.log(achievementsArray)
        return NextResponse.json({achievementsArray: achievementsArray}, {status: 200});
    } catch (error) {
        console.log(" catch ")
        return NextResponse.json({error: "achievements error 500"}, {status: 500})
    }
}
