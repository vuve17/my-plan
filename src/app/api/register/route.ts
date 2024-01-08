import bcrypt from 'bcrypt';
import { db  } from '@vercel/postgres';
import type { RegisterParams } from '@/app/lib/types';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken'



export async function POST(req:Request) {
    const body = await req.json()

      const {email, username, password} : RegisterParams = await {
        ...body
      }
      
      const client = await db.connect();
  
      const hashedPassword = await bcrypt.hash(password, 10);

        try {

            const userExists = await client.sql`
              SELECT id FROM users WHERE name = ${email};
            `;
        
            if (userExists.rows.length > 0) {
              return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
            }
            console.log("match")
            await client.sql`
            INSERT INTO users (name, email, password)
              VALUES (${username}, ${email}, ${hashedPassword})
              ON CONFLICT (email) DO NOTHING;`
            
              const getUser = await client.sql`
              SELECT id FROM users WHERE email = ${email};`;

              const userId = getUser.rows[0].id


            if(!userId || userId == undefined)
            {
              throw new Error("no user id")
            }

            const newUserAchievements = await client.sql`
            SELECT id FROM Achievements
            WHERE stars = 0
            `;
            
            newUserAchievements.rows.forEach(async (row) => {
                try{
                  await client.sql`INSERT INTO user_Achievements ( id, User_id ) VALUES (${row.id}, ${userId})`

                }
                catch(error){
                  console.log(error, "error adding achievements to new user")
                }
            });

            const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
              expiresIn: "1m",
            });
            
            return NextResponse.json({ token });
            
          } catch (error) {
            console.error('Error registering user:', error);
            return NextResponse.json({message: 'error 500'}, {status: 500})
          }

}

// async function AddInitialAchievemts(userId: string,  AchievementId: number) {
//   const query = `INSERT INTO user_Achievements ( Achievement_id, User_id ) VALUES (${AchievementId}, ${userId})`
//   return await query
// }
