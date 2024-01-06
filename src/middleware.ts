import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/lib/auth";


export async function middleware(request: NextRequest){

    const token = request.cookies.get("token")?.value  
    
    const verifyedToken = token && verifyAuth(token).catch((error) => {
        console.log(error)
    })

    if(!token)
    {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if(verifyedToken){
        return 
    }
   
};

export const config = {
    matcher: ['/scheduler', '/scheduler/:path*']
}