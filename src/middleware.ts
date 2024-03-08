'use server'

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "./app/lib/auth";

export async function middleware(request: NextRequest){
    try{
        const token = request.cookies.get("token")?.value as string;
        // const token = "ssss"
        const userId = await getUserId(token);
        if (!userId) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        return NextResponse.next()
    }   
    catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
};

export const config = {
    matcher: ['/scheduler', '/scheduler/:path*']
}