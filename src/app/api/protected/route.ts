import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic'

interface MyJwtPayload {
    exp: number;
}

export async function GET() {

  try {
    const headersInstance = headers();
    const authHeader = headersInstance.get("authorization");

    if(authHeader !== null)
    {

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as MyJwtPayload | undefined;
    if (!decoded) {
      return NextResponse.json(
        { message: "Expired" },
        {
          status: 400,
        }
      );
    } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { message: "Expired" },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { data: "Protected data" },
        {
          status: 200,
        }
      );
    }
    }
    else{
        console.log("error")
        throw new Error
    }
  } catch (error) {
    console.error("Token verification failed", error);
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 400,
      }
    );
  }
}