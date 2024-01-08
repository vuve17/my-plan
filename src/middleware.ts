import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "./app/lib/auth";


export async function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value as string;
    const userId = await getUserId(token);
    console.log(token)
    if (!userId) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
   
};

export const config = {
    matcher: ['/scheduler', '/scheduler/:path*']
}