"use server";

import { getUserViaEmail } from "@/app/lib/auth";
import { handleReadKeysFromDb } from "@/app/lib/key-handlers";
import type { LoginParams } from "@/app/lib/types";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const body = await req.json();
  const { email, password }: LoginParams = await { ...body };
  const user = await getUserViaEmail(email);

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const response = await handleReadKeysFromDb(user.id);
    return response;
  } else {
    return NextResponse.json({ message: "Wrong Password" }, { status: 401 });
  }
}
