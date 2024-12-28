import { NextRequest, NextResponse } from "next/server";
import { db, sql } from "@vercel/postgres";
import { getUserId } from "@/app/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: number }}) {
    try {
        const { id } = params
        const body = await request.json()
        const {
            title,
            description,
            startDate,
            endDate,
            taskType
        } = await {...body}
        console.log("id:" , id)
        const authorizationHeader = request.headers.get('Authorization');
        const token = authorizationHeader ? authorizationHeader.replace("Bearer ", "").trim() : null;
        console.log(token, authorizationHeader)
        if (token) {
            const userId = await getUserId(token);
            const client = await db.connect();
            const query =  `UPDATE tasks
                            SET             
                            title = COALESCE($1, title),                
                            description = COALESCE($2, description), 
                            start_date = COALESCE($3, start_date),   
                            end_date = COALESCE($4, end_date),
                            task_type = COALESCE($5, task_type)  
                            WHERE user_id = $6 AND id = $7
                            RETURNING id, title;`        
                            
            const result = await client.query(query,
            [title, description, startDate, endDate, taskType ,userId, id]
            );
            // console.log("result: ", result);
            if (result.rows.length === 0) {
                return NextResponse.json({ error: "Task not found or unauthorized" }, { status: 404 });
            } 
            const resultTitle: string = result.rows[0].title
            console.log("title: ", title);
            console.log("result.rows[0]: ", result.rows[0]);
             
            return NextResponse.json({ title: resultTitle }, { status: 200 });
        }
        return NextResponse.json({ error: "User token is invalid" }, { status: 401 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred", details: error }, { status: 500 });
    }
}