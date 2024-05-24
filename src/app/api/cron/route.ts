import { db } from "@vercel/postgres";
import { NextRequest } from 'next/server';

async function POST(request: NextRequest) {
    const client = await db.connect()
    await client.sql`
    insert into  cron (test)
    values("test")
    `
    client.release()
}