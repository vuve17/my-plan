'use server'

import bcrypt from 'bcrypt';
import type { LoginParams, UserDb } from '@/app/lib/types';
import { NextResponse } from 'next/server'
import { Test, handleReadKeysFromDb, } from '@/app/lib/key-handlers';
import { getUserViaEmail } from '@/app/lib/auth';
import { KeyResult} from '@/app/lib/types';

export async function POST(req: Request) {

  const body = await req.json()
  const { email, password }: LoginParams = await { ...body }
  const user = await getUserViaEmail(email)

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 401 })
  }

  const match = await bcrypt.compare(password, user.password)

  if (match) {
    const response = await handleReadKeysFromDb(user.id)
    // response undefined constantly
    // const response = await Test(user.id)
    return response
  } else {
    return NextResponse.json({ message: "Wrong Password" }, { status: 401 })
  }
}
