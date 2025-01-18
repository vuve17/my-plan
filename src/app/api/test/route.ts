'use server';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { Resend } from 'resend';
import { sendEmail } from '@/app/lib/send-user-tasks-via-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  await sendEmail()
  return NextResponse.json({ message: 'Daily check tasks reset for all users' });
}