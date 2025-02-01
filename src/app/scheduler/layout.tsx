"use client";

import Cookies from "js-cookie";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/navbar-private";
import AchievementModal from "../components/scheduler/achievements/achievement-modal";
import CompleteTasksDialog from "../components/scheduler/modals/complete-tasks-modal";
import "../index.css";
import { Task } from "../lib/types";
import { closeAchievementModal } from "../redux/achievements-slice";
import { ReduxProvider } from "../redux/provider";
import { setIsMobile } from "../redux/screen-1200-slice";
import { RootState } from "../redux/store";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

const metadata = {
  title: "MyPlan",
  description: "A good day starts with a good plan",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const dispatch = useDispatch();
  const isDevice1200 = useSelector((state: RootState) => state.screen.isMobile);
  const areDailyTaskChecked = useSelector(
    (state: RootState) => state.user.dailyTaskCheck
  );
  const currentlyOpenAchievement = useSelector(
    (state: RootState) => state.achievements.currentlyOpenAchievement
  );
  const [openNewAchievementModal, setOpenNewAchievementModal] =
    useState<boolean>(false);

  function handleNewAchievementModalClose() {
    dispatch(closeAchievementModal());
    setOpenNewAchievementModal(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 1200));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    async function fetchDailyTasks() {
      try {
        console.log("fetchDailyTasks() called!!!!");
        const token = Cookies.get("refreshToken");
        const response = await fetch("/api/complete-tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          const body = await response.json();
          console.log("response: /api/complete-tasks", body);
          if (body.tasks.length > 0) {
            setTasks(body.tasks);
            setOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    if (!areDailyTaskChecked) {
      console.log("calling fetchDailyTasks()!!!!");
      fetchDailyTasks();
    }
  }, []);

  useEffect(() => {
    if (currentlyOpenAchievement) {
      setOpenNewAchievementModal(true);
    }
  }, [currentlyOpenAchievement]);
  return (
    <>
      <ReduxProvider>
        <NavBar deviceSmall={isDevice1200} />
        <CompleteTasksDialog onClose={handleClose} open={open} tasks={tasks} />
        {openNewAchievementModal && currentlyOpenAchievement && (
          <AchievementModal
            achievement={currentlyOpenAchievement}
            open={openNewAchievementModal}
            onClose={handleNewAchievementModalClose}
          />
        )}
        <div>{children}</div>
      </ReduxProvider>
    </>
  );
}
