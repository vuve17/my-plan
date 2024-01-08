import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { getUserId } from '../../lib/auth';
import { db } from '@vercel/postgres';
import { Achievement } from "@/app/lib/types";

async function getAchievements(userId:string) {
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
        const token = request.cookies.get("token")?.value as string; 
        const userId = await getUserId(token) as string;
        const achievementsArray = await getAchievements(userId)
        console.log(achievementsArray)
        return NextResponse.json({achievementsArray: achievementsArray}, {status: 200});
    } catch (error) {
        console.error('Error decoding token:', error);
    }
}
