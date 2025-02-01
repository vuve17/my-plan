"use server";

import { db } from "@vercel/postgres";
import { format } from "date-fns";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface UserTask {
  id: number;
  email: string;
  name: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  task_type: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  processed: boolean;
}

export async function sendEmail(): Promise<void> {
  const client = await db.connect();
  const today = format(new Date(), "yyyy-MM-dd");

  try {
    const query = `
      SELECT u.id, u.email, u.name, t.*
      FROM users u
      JOIN tasks t ON u.id = t.user_id
      WHERE CAST(t.start_date AS DATE) = $1
    `;
    const { rows: userTasks }: { rows: UserTask[] } = await client.query(
      query,
      [today]
    );

    const tasksByUser: {
      [userId: string]: { email: string; tasks: UserTask[] };
    } = userTasks.reduce((acc, row) => {
      const { user_id, email, ...taskDetails } = row;
      if (!acc[user_id]) {
        acc[user_id] = { email, tasks: [] };
      }
      acc[user_id].tasks.push(taskDetails as UserTask);
      return acc;
    }, {} as { [userId: string]: { email: string; tasks: UserTask[] } });

    const emailPromises = Object.entries(tasksByUser).map(
      async ([userId, { email, tasks }]) => {
        const taskTableRows = tasks
          .map(
            ({ title, description, start_date, end_date }) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${title}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              description || ""
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${format(
              new Date(start_date),
              "eee, dd. MMMM, HH:mm"
            )}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${format(
              new Date(end_date),
              "eee, dd. MMMM, HH:mm"
            )}</td>
          </tr>
        `
          )
          .join("");

        const taskTable = `
        <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Title</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Start Time</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">End Time</th>
            </tr>
          </thead>
          <tbody>
            ${taskTableRows}
          </tbody>
        </table>
      `;

        try {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "vuvedran@gmail.com", // Send email to the user's email
            subject: "Your Tasks for Today",
            html: `
            <p>Hi, ${tasks[0].name}</p>
            <p>Here are your tasks for today:</p>
            ${taskTable}
            <p>Best regards,<br />MyPlan</p>
          `,
          });
        } catch (emailError) {
          console.error(`Failed to send email to ${email}:`, emailError);
        }
      }
    );

    await Promise.all(emailPromises);

    await client.sql`
      UPDATE users
      SET daily_check_tasks = false
    `;
  } catch (error) {
    console.error("Error processing daily tasks:", error);
  } finally {
    client.release();
  }
}
