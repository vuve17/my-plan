'use server';

import { getUserId } from "@/app/lib/auth";
import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function DELETE(request: NextRequest, { params }: { params: { id: number }}) {
    try {
        const { id } = params
        console.log("id:" , id)
        const authorizationHeader = request.headers.get('Authorization');
        const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "").trim() : null;
        console.log(token, authorizationHeader)
        if (token) {
            const userId = await getUserId(token);
            const client = await db.connect();
            const query =   `DELETE FROM tasks
                            WHERE user_id = $1 AND id = $2
                            RETURNING id, title;`

            const result = await client.query(query, [userId, id]);
            console.log("result: ", result);


            if (result.rows.length === 0) {
                return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
            } 
            const title: string = result.rows[0].title
            console.log("title: ", title);
            console.log("result.rows[0]: ", result.rows[0]);
             
            return NextResponse.json({ title: title }, { status: 200 });
        }

        return NextResponse.json({ error: "User token is invalid" }, { status: 401 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred", details: error }, { status: 500 });
    }
}
