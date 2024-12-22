"use client";
import React from "react";
import AchievementModal from "../components/scheduler/achievements/achievement-modal";
import { Achievement, Task, UserAchievement } from "../lib/types";
import { splitSingleTaskByDays, splitMultipleTasksByDaysTest } from "../lib/user-tasks-functions";
import { useRef } from "react";

const AboutPage: React.FC = () => {

  // const achievement: UserAchievement = {
  //   id: 1,
  //   name: "superman",
  //   image:
  //     "hustler.svg",
  //   description: "superman des",
  //   stars: 1,
  // };

  const achievementsArray: Task[] = [
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
      title: "Dec 04 2024 21:00:00 - Dec 05 2024 15:00:00 ",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 21:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 15:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 478,
      title: " Dec 04 2024 20:00:00 - Dec 05 2024 21:00:00",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 04 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 05 2024 21:00:00 GMT+0100"),
      // completed: false,
    },
    {
      id: 479,
      title: "Dec 05 2024 20:00:00 - Dec 06 2024 21:00:00",
      description: "",
      // user_id: "472cac5f-0eb9-4e95-b2ad-99a1075ae3a8",
      taskType: "chore",
      startDate: new Date("Wed Dec 05 2024 20:00:00 GMT+0100"),
      endDate: new Date("Thu Dec 06 2024 21:00:00 GMT+0100"),
      // completed: false,
    }
  ];

  const splitedTasksArray = splitMultipleTasksByDaysTest(achievementsArray)

  console.log(splitedTasksArray)
  
  return <div></div>
  // <AchievementModal achievement={achievement} />;
};

export default AboutPage;
// "C:/my-plan/public/svg/achievements/achievement-thumbnails/hustler.svg",