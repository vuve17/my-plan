'use server'

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from 'next/server';
import { Task } from "@/app/lib/types";
import { headers } from 'next/headers'

export async function POST(request: NextRequest){
    const client = await db.connect()


}