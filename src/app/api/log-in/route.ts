'use server'

import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import type { User, UserDb } from '@/app/lib/types';
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken'


async function getUser (username: string, email: string) {
    
      const client = await db.connect();
      const getUser = await client.sql`
      SELECT * FROM users
      WHERE name=${username} AND email=${email} ;`
      const user = {...getUser.rows[0]}

      return await user
  }

export async function POST(req:Request) {

    const body = await req.json()
    const {email, username, password} : User = await {
        ...body
      }
    try{
      const user = await getUser(username, email)
      
      const hashedPassword = user.password

      const match = await bcrypt.compare(password, hashedPassword)
      if(match){
        console.log("match")
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: "1m",
        });
        return NextResponse.json({ token });
      }
      else{
        console.error({message: "error"})
        return NextResponse.json({message: 'error 500'}, {status: 500})
      }
 
    }
    catch(error){
      console.log(error)
      return NextResponse.json({message: 'error 500'}, {status: 500})
    }
  
}