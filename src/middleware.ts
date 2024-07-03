'use server'

import { NextRequest, NextResponse } from "next/server";
import { getUserId, getExpirationDate } from "./app/lib/auth";
import { createAccessKey, createRefreshKey } from './app/lib/key-handlers';
import { createToken } from './app/lib/types';


async function handleAccessToken(accessToken: string, userIdFromExistingRefreshKey: string, request: NextRequest) {
    const userIdFromExistingAccessKey = await getUserId(accessToken);
    console.log("5")
    if (userIdFromExistingAccessKey) {
        if(userIdFromExistingAccessKey != userIdFromExistingRefreshKey)
        {
            console.log("different userIds")
            return NextResponse.redirect(new URL('/login', request.url));
        }
        console.log("6")
        const accessExp = await getExpirationDate(accessToken);
        console.log("accessExp: ", accessExp)
        console.log("Date.now(): ", Date.now()) 
        if (accessExp && Date.now() < accessExp) {
            console.log('NEXT');
            return NextResponse.next();
        } else {
            console.log("else")
            const newAccessKey: createToken = await createAccessKey(userIdFromExistingRefreshKey);
            console.log(newAccessKey)
            if(!newAccessKey.success)
            {
                console.log("accessKey creation error")
                return NextResponse.redirect(new URL('/login', request.url));
            }
                return NextResponse.next();
            }     
        }

    const newAccessKey : createToken = await createAccessKey(userIdFromExistingRefreshKey);
    console.log("7")
    if (newAccessKey.success) {
        return handleAccessToken(newAccessKey.token, userIdFromExistingRefreshKey, request);
    }
    console.log('middleware error, access key creating error - sign in again');
    return NextResponse.redirect(new URL('/login', request.url));
}

export async function middleware(request: NextRequest) {
    try {
        const refreshToken =  request.cookies.get('refreshToken')?.value;
        const accessToken = request.cookies.get('accessToken')?.value;

        console.log("1")

        if (!refreshToken) {
            console.log('middleware error, refresh token doesn\'t exist');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const userIdFromExistingRefreshKey = await getUserId(refreshToken);

        console.log("2")

        if (!userIdFromExistingRefreshKey) {
            console.log('middleware error, refresh token invalid');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const refreshExp = await getExpirationDate(refreshToken);
        console.log("3")
        console.log(refreshExp)
        console.log(Date.now())

        if (!refreshExp || Date.now() >= refreshExp) {
            console.log('refresh token expired - sign in again');
            return NextResponse.redirect(new URL('/login', request.url));
        }
        console.log("4")
        if (accessToken) {
            return await handleAccessToken(accessToken, userIdFromExistingRefreshKey, request);
        } else {
            console.log('log in Required');
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        console.error('middleware error:', error);
        return NextResponse.json({ message: "error" }, { status: 500 });
    }
}

export const config = {
    matcher: ['/scheduler']
};

// , '/scheduler/:path*'