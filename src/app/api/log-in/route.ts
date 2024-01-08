'use server'

import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import type { LoginParams, UserDb } from '@/app/lib/types';
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken'


async function getUser ( email: string) {
    
      const client = await db.connect();
      const getUser = await client.sql`
      SELECT * FROM users
      WHERE  email=${email} ;`
      const user = getUser.rows[0]

      return await user
  }

export async function POST(req:Request) {

  const body = await req.json()
  const {email, password} : LoginParams = await {
      ...body
    }
  const user = await getUser(email)
  if(!user){
    return NextResponse.json({message: "user not found"},{status: 401})
  }
  const match = await bcrypt.compare(password, user.password)
  if(match){
    console.log("match")
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string);
    return NextResponse.json({ token });
  }
  else{
    console.error({message: "error"})
    return NextResponse.json({message: 'Wrong Password'}, {status: 401})
  }

}