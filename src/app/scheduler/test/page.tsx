"use client";
import React, { useEffect, useState } from "react";
import { Task, TaskType } from "../../lib/types";
import CompleteTasksModal from "../../components/scheduler/modals/complete-tasks-modal";
import Cookies from "js-cookie";

const TestPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [taskArray, setTaskArray] = useState<Task[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchTasks() {
      const token = Cookies.get("refreshToken");
      const response = await fetch("/api/complete-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks: ", data.tasks);
        const tasks: Task[] = data.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
          description: task.description,
          taskType: task.taskType as TaskType,
          proccessed: task.proccessed,
        }));
        setTaskArray(tasks);
        console.log("Updated taskArray: ", tasks);
      } else {
        console.error("Failed to fetch tasks");
      }
    }

    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button onClick={handleOpen}>Open Modal</button>
      <CompleteTasksModal tasks={taskArray} open={open} onClose={handleClose} />
    </div>
  );
};

export default TestPage;