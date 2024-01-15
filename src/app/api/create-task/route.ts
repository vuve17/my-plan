'use server'

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from 'next/server';
import { Task } from "@/app/lib/types";

export async function POST(request: NextRequest){
    const client = await db.connect()
    const body = await request.json()
    const {
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    description
    } = await {...body }
    
    const authorizationHeader = request.headers.get('authorization');
    const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : null;
    if(token){
        const userId = await getUserId(token)
        await client.sql`
        INSERT INTO tasks (title, start_date, end_date, start_time, end_time, description, user_id)
        VALUES 
        (${title}, ${startDate}, ${endDate}, ${startTime}, ${endTime}, ${description}, ${userId});

        `
        return NextResponse.json({message: "created"}, {status: 201})
    }
    else{
        console.log("bad")
        return NextResponse.json({message: "something went wrong"},{status: 500})
    }
}