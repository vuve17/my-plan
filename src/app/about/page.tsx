"use client";
import React, { useState } from "react";
import AchievementModal from "../components/scheduler/achievements/achievement-modal";
import { Achievement, Task, UserAchievement } from "../lib/types";
import { splitSingleTaskByDays, splitMultipleTasksByDaysTest } from "../lib/user-tasks-functions";
import { useRef } from "react";
import CompleteTasksModal from "../components/scheduler/modals/complete-tasks-modal";

const AboutPage: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = (tasks?: Task[]) => {
    setOpen(false);
    if (tasks) {
      setSelectedTasks(tasks);
    }
  };
  const tasksArray: Task[] = [
    {
      id: 476,
      title: " 04 2024 22:00:00  - Dec 05 2024 04:00:00",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 22:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 04:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 477,
      title: "Bruhhhh this hsit again",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 21:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 15:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 478,
      title: " Text 2",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 21:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 479,
      title: "super duper task",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 05 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 06 2024 21:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 436,
      title: " 04 2024 22:00:00  - Dec 05 2024 04:00:00",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 22:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 04:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 437,
      title: "Bruhhhh this hsit again",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 21:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 15:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 438,
      title: " Text 2",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 21:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 429,
      title: "event task :)",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "event",
      startDate: new Date("Wed Dec 05 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 06 2024 21:00:00 GMT+0100"),
      // completed: false,
    }
  ];


  // const splitedTasksArray = splitMultipleTasksByDaysTest(achievementsArray)

  // console.log(splitedTasksArray)
  
  return <div>
    <CompleteTasksModal tasks={tasksArray} open={true} onClose={handleClose}/>
  </div>
};

export default AboutPage;
