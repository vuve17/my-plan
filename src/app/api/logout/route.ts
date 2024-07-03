'use server'

import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { deleteAllKeys } from "@/app/lib/key-handlers";
import { getUserId } from "@/app/lib/auth";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const logoutResponse = await logout(request);
        return logoutResponse;
    } catch (error) {
        console.error('Error during POST logout:', error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

async function logout(request: NextRequest): Promise<NextResponse> {
    try {
        const cookies = request.cookies;
        const refreshToken = cookies.get('refreshToken')?.value;
        const accessToken = cookies.get('accessToken')?.value;

        const token = refreshToken || accessToken;
        if (!token) {
            return NextResponse.json({ message: "No valid token found" }, { status: 400 });
        }

        const userId = await getUserId(token);

        if (!userId) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const deleteRefreshKeys = await deleteAllKeys(userId, "refresh");
        const deleteAccessKeys = await deleteAllKeys(userId, "access");

        if (!deleteRefreshKeys.success || !deleteAccessKeys.success) {
            return NextResponse.json({ message: "Error deleting tokens" }, { status: 500 });
        }

        const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        response.cookies.delete('refreshToken');
        response.cookies.delete('accessToken');

        return response;

    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
