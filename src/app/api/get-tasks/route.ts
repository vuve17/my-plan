'use server'

import { NextRequest, NextResponse } from "next/server"
import { db } from "@vercel/postgres";
import { getUserId } from "@/app/lib/auth";
import { headers } from "next/headers";


export async function GET(request: NextRequest) {
    const client = await db.connect()
    const authorizationHeader = headers().get('authorization');
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;
    console.log(token, "   ...   ", authorizationHeader);
    
    if(token){
        const userId = await getUserId(token)
        console.log("userId", userId)
        const tasks = await client.sql`
            SELECT title, start_date, end_date, description, task_type 
            FROM tasks
            WHERE user_id = ${userId}
        `;
        console.log(tasks.rows)
        console.log(tasks.rowCount)
        return NextResponse.json({tasks: {...tasks.rows}}, {status: 200})
    }
    else{
        return NextResponse.json({ error: 'Unauthorized - Missing or invalid token' }, { status: 401 })
    }
}