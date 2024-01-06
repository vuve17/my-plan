import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { verifyAuth } from '../../lib/auth';
import { db } from '@vercel/postgres';
import { Achievement } from "@/app/lib/types";

async function getAchievements(userId:string) {
    const achievements: Achievement[] = []
    const client = await db.connect()
    const achievements_id = await client.sql`
    SELECT Achievement_id FROM user_achievements
    WHERE User_id = ${userId}
    `
    const promises = achievements_id.rows.map(async (row) => {
        const newAchievement = await client.sql`
            SELECT * FROM achievements
            WHERE Achievement_id = ${row.achievement_id}
        `;
        const new_ach: Achievement = newAchievement.rows.pop() as Achievement;
        return new_ach;
    });

    const results = await Promise.all(promises);
    achievements.push(...results);

    return achievements;
}

export async function POST(request: NextRequest) {
    try {
        console.log("api try")
        const token = request.cookies.get("token")?.value  
        if(!token){
            throw new Error("Cookie not found")
        }   
        const userId = await verifyAuth(token)
        const achievementsArray = await getAchievements(userId.userId)
        console.log(achievementsArray)
        return NextResponse.json({achievementsArray: achievementsArray}, {status: 200});
    } catch (error) {
        console.error('Error decoding token:', error);
    }
}
