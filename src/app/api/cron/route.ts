'use server';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const client = await db.connect();

  const users = await client.sql`
    SELECT id, name, email, password, xp, daily_check_tasks
    FROM users
  `;

  for (const user of users.rows) {
    await client.sql`
      UPDATE users
      SET daily_check_tasks = false
      WHERE id = ${user.id}
    `;
  }

  client.release();
  return NextResponse.json({ message: 'Daily check tasks reset for all users' });
}