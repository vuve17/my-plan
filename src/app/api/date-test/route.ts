"use server";

import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const client = await db.connect();
  const body = await request.json();
  const { date } = await { ...body };
  const dateToDate = new Date(date);
  const dateToIsoString = dateToDate.toISOString();

  // console.log("date: ", date)
  // console.log("dateToDate: ", dateToDate)
  // console.log("dateToIsoString: ", dateToIsoString)

  try {
    const insertDate =
      await client.sql`insert into events (event_time, event_time_tz)
     values (${dateToIsoString}, ${dateToIsoString})`;

    const datetime = await client.sql`
    select event_time_tz from events 
    where id = 34
    `;

    const localDate = new Date(datetime.rows[0].event_time_tz);

    console.log("not string: ", datetime.rows[0].event_time_tz);
    console.log("Local Time:", localDate.toString());

    return NextResponse.json(
      { eventTimeTz: datetime.rows[0].event_time_tz },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: date }, { status: 400 });
  }
}
