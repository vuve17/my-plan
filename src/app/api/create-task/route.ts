'use server'

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from 'next/server';
import { Task } from "@/app/lib/types";
import { headers } from 'next/headers'

export async function POST(request: NextRequest){
    const client = await db.connect()
    const body = await request.json()
    const {
    title,
    startDate,
    endDate,
    description
    } = await {...body }
    
    const authorizationHeader = headers().get("authorization");
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;
    if(token){
        // sql injection :(
        const userId = await getUserId(token)
        await client.sql`
        INSERT INTO tasks (title, start_date, end_date, description, user_id)
        VALUES 
        (${title}, ${startDate}, ${endDate}, ${description}, ${userId});
        `
        return NextResponse.json({message: "created"}, {status: 201})
    }
    else{
        console.log("create task aborted in api/create-task")
        return NextResponse.json({message: "something went wrong"},{status: 500})
    }
}