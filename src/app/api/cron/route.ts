'use server';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const client = await db.connect();

  await client.sql`
    UPDATE users
    SET daily_check_tasks = false
  `;

  const message = "Hello, world!";
  const bool = true;

  await client.sql`
    INSERT INTO test (message, bool)
    VALUES (${message}, ${bool})
  `;

  client.release();
  return NextResponse.json({ message: 'Daily check tasks reset for all users' });
}