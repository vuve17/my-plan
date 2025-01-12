"use client";

import { getTasks } from "@/app/lib/user-tasks-functions";
import {
  setIsTaskModalActive,
  setTaskModalDate,
} from "@/app/redux/task-modals-slice";
import { setSelectedDate } from "@/app/redux/selected-date-slice";
import { setIsSnackBarOpen, setSnackBarText } from "@/app/redux/snackbar-slice";
import { RootState } from "@/app/redux/store";
import { setTasks } from "@/app/redux/tasks-slice";
import colors from "@/app/ui/colors";
import { headerHeight } from "@/app/utils/index.js";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertSingleTaskStringToTask } from "../../lib/user-tasks-functions";
import CreateTaskModal from "./modals/create-task-modal";
import UpdateTaskModal from "./modals/update-task-modal";
import {
  NextArrow,
  PreviousArrow,
} from "./scheduler_utils/scheduler-navigation-arrows";
import UserSchedulerColumn from "./user-scheduler-column";
import TimeTable from "./user-scheduler-day-time";
import AchievementModal from "./achievements/achievement-modal";
import MultipleTasksModal from "./modals/multiple-tasks-select-modal";
import { closeAchievementModal } from "@/app/redux/achievements-slice";
import Cookies from "js-cookie";
import { setXp } from "@/app/redux/user-slice";

export const dynamic = "force-dynamic";

const width = {
  xl: "80vw",
  lg: "70vw",
  md: "100vw",
  sm: "100vw",
  xs: "100vw",
};

function getChosenDateTime(divId: string) {
  const dateString = divId.indexOf("_");
  const dateBeforeUnderscore = divId.slice(0, dateString);
  const month = dateBeforeUnderscore.slice(0, 2);
  const day = dateBeforeUnderscore.slice(2, 4);
  const time = divId.slice(dateString + 1);
  const year = Number(dateBeforeUnderscore.slice(4, dateString));
  const date = new Date(year, +month - 1, +day, Number(time));

  return { date, time };
}

const UserScheduler: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state: RootState) => state.screen.isMobile);
  const [openNewAchievementModal, setOpenNewAchievementModal] =
    useState<boolean>(false);
  const maxDateString = useSelector(
    (state: RootState) => state.selectedDate.maxDate
  );
  const isSnackBarOpen = useSelector(
    (state: RootState) => state.snackbar.isSnackBarOpen
  );
  const isTasksMultipleModalOpen = useSelector(
    (state: RootState) => state.createTaskModal.isTaskModalMultipleActive
  );
  const selectedTasksMultiple = useSelector(
    (state: RootState) => state.tasks.selectedTasksMultiple
  );
  const snackbarText = useSelector(
    (state: RootState) => state.snackbar.snackbarText
  );
  const snackbarAlertState: "success" | "warning" | "error" = useSelector(
    (state: RootState) => state.snackbar.snackbarAlertState
  );
  const isTaskModalActive: boolean = useSelector(
    (state: RootState) => state.createTaskModal.isTaskModalActive
  );
  const selectedStringDate = useSelector(
    (state: RootState) => state.selectedDate.selectedDate
  );
  const selectedTaskString = useSelector(
    (state: RootState) => state.tasks.selectedTask
  );
  const areDailyTaskChecked = useSelector(
    (state: RootState) => state.user.dailyTaskCheck
  );
  const currentlyOpenAchievement = useSelector(
    (state: RootState) => state.achievements.currentlyOpenAchievement
  );
  const selectedTask = selectedTaskString
    ? convertSingleTaskStringToTask(selectedTaskString)
    : null;

  const scheduleHeaderRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelecteStateDate] = useState<Date>(
    new Date(selectedStringDate)
  );
  const [prevWeekArrow, setPrevWeekArrow] = useState<boolean>(false);
  const [nextWeekArrow, setNextWeekArrow] = useState<boolean>(false);
  const minDate = new Date();
  const maxDate = new Date(maxDateString);
  const { week: maxWeek, year: maxYear } = getISOWeekInfo(maxDate);
  const { week: minWeek, year: minYear } = getISOWeekInfo(minDate);
  const weekdayFormat = isMobile ? "short" : "long";
  const [scheduleHeader, setScheduleHeader] = useState<string>("");
  const [schedule, setSchedule] = useState<JSX.Element[]>([]);

  const tasksRefFlag = useRef<boolean>(true);

  const handleTaskModalState = (id: string) => {
    const dateTime = getChosenDateTime(id);
    setTaskModalDate(dateTime.date.toISOString());
    setIsTaskModalActive(true);
  };
  // console.log("scheduler is rendering ")
  const handleSnackbarOpen = () => {
    dispatch(setIsSnackBarOpen(true));
  };

  const handleSnackbarClose = () => {
    dispatch(setIsSnackBarOpen(false));
  };

  const handleSnackbarText = (text: string) => {
    dispatch(setSnackBarText(text));
  };

  function handleNewAchievementModalClose() {
    dispatch(closeAchievementModal());
    setOpenNewAchievementModal(false);
  }

  function getISOWeekInfo(date: Date): { week: number; year: number } {
    const currentDate = new Date(date.getTime());
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(
      currentDate.getDate() + 4 - (currentDate.getDay() || 7)
    );
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil(
      ((currentDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );

    return { week: weekNo, year: currentDate.getFullYear() };
  }

  const nextWeekFunc = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    const newDateToString = newDate.toISOString();
    dispatch(setSelectedDate(newDateToString));
  };

  const previousWeekFunc = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    const newDateToString = newDate.toISOString();
    dispatch(setSelectedDate(newDateToString));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const weekDayGenerator = (selectedDate: Date) => {
    const startOfWeek = new Date(selectedDate);
    const endOfWeek = new Date(selectedDate);
    startOfWeek.setDate(
      selectedDate.getDate() -
        selectedDate.getDay() +
        (selectedDate.getDay() === 0 ? -6 : 1)
    );
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const newSchedule = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const headingDayName = `${day.toLocaleDateString("en-US", {
        weekday: weekdayFormat,
      })}`;
      const headingDate = `${(day.getDate() < 10 ? "0" : "") + day.getDate()}.${
        (day.getMonth() < 9 ? "0" : "") + (day.getMonth() + 1)
      }`;
      const current_day = day.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "numeric",
      });
      const isToday =
        day.getDate() === minDate.getDate() &&
        day.getMonth() === minDate.getMonth() &&
        day.getFullYear() === minDate.getFullYear();

      newSchedule.push(
        <UserSchedulerColumn
          key={current_day}
          date={day}
          headingDayName={headingDayName}
          headingDate={headingDate}
          colNumber={i}
          {...(isToday && { isToday })}
        />
      );
    }
    const newScheduleHeader = `${startOfWeek.getDate()}. - ${endOfWeek.getDate()}. ${endOfWeek.toLocaleString(
      "en",
      {
        month: "long",
      }
    )}`;

    return { newSchedule, newScheduleHeader };
  };

  useEffect(() => {
    setSelecteStateDate(new Date(selectedStringDate));
  }, [selectedStringDate]);

  useEffect(() => {
    const { newSchedule, newScheduleHeader } = weekDayGenerator(selectedDate);
    setSchedule(newSchedule);
    setScheduleHeader(newScheduleHeader);
    const { week: selectedWeek, year: selectedYear } =
      getISOWeekInfo(selectedDate);

    if (selectedWeek === maxWeek && selectedYear === maxYear) {
      setNextWeekArrow(true);
    } else if (selectedWeek === minWeek && selectedYear === minYear) {
      setPrevWeekArrow(true);
    } else {
      setPrevWeekArrow(false);
      setNextWeekArrow(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (currentlyOpenAchievement) {
      setOpenNewAchievementModal(true);
      console.log("Opening Achievement Modal", currentlyOpenAchievement);
    }
  }, [currentlyOpenAchievement]);

  useEffect(() => {
    async function fetchAndSetTasks() {
      try {
        const fetchedTasks = await getTasks();
        if (fetchedTasks) {
          dispatch(setTasks(fetchedTasks));
        }
        const token = Cookies.get("refreshToken");
        const userXp = await await fetch(`/api/xp`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("userXp: ", userXp);
        const responseXp: { xp: number } = await userXp.json();
        console.log("userXp: ", responseXp.xp);

        if (userXp) {
          dispatch(setXp(responseXp.xp));
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    if (tasksRefFlag.current) {
      // console.log("calling fetchAndSetTasks()");
      fetchAndSetTasks();
      tasksRefFlag.current = false;
    }
  }, []);

  // console.log( "scheduler redux logs : isNewAchievementModalOpen && currentlyOpenAchievement : ",
  //    " ", currentlyOpenAchievement)

  return (
    <>
      {selectedTask
        ? selectedTask && <UpdateTaskModal task={selectedTask} />
        : isTaskModalActive && <CreateTaskModal />}

      {isTasksMultipleModalOpen && selectedTasksMultiple && (
        <MultipleTasksModal />
      )}

      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarText}
        // TransitionComponent={SlideTransition}
      >
        <Alert
          // onClose={handleClose}
          severity={snackbarAlertState}
          variant="filled"
          sx={{ width: "100%" }}
          action={action}
        >
          {snackbarText}
        </Alert>
      </Snackbar>

      {openNewAchievementModal && currentlyOpenAchievement && (
        <AchievementModal
          achievement={currentlyOpenAchievement}
          open={openNewAchievementModal}
          onClose={handleNewAchievementModalClose}
        />
      )}

      <Box
        sx={{
          boxSizing: "border-box",
        }}
      >
        <Box
          id="schedule_header"
          ref={scheduleHeaderRef}
          sx={{
            display: "flex",
            padding: "1em 2em 1em 2em",
            justifyContent: "space-between",
            position: "fixed",
            top: "79px",
            zIndex: 50,
            backgroundColor: isMobile ? colors.primaryBlue : colors.white,
            color: isMobile ? colors.white : colors.primaryBlue,
            fontWeight: 600,
            width: {
              xs: "calc(100% - 4em)",
              sm: "calc(100% - 4em)",
              md: "calc(100% - 4em)",
              lg: "calc(70vw - 4em)",
              xl: "calc(80vw - 4em)",
            },
            marginBottom: {
              ...headerHeight,
            },
          }}
        >
          {isMobile ? null : (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {scheduleHeader}
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 2,
              height: "30px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <PreviousArrow
              height={"14px"}
              onClick={previousWeekFunc}
              hidden={prevWeekArrow}
              color={isMobile ? colors.white : ""}
            />
            {isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {scheduleHeader}
              </Box>
            ) : null}

            <NextArrow
              height={"14px"}
              onClick={nextWeekFunc}
              hidden={nextWeekArrow}
              color={isMobile ? colors.white : ""}
            />
          </Box>
        </Box>
        <Box
          id="schedule"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            height: {
              sm: "100%",
              lg: `calc(100vh - 142px)`,
              //80px 62px
            },
            width: {
              ...width,
            },
            marginTop: 0,
            position: isMobile ? "relative" : "fixed",
            bottom: 0,
            overflowY: "auto",
            overflowX: isMobile ? "auto" : "hidden",
            "&::-webkit-scrollbar": {
              display: isMobile ? "auto" : "none",
            },
            msOverflowStyle: isMobile ? "auto" : "none",
            scrollbarWidth: "none",
          }}
        >
          <TimeTable />
          {schedule}
        </Box>
      </Box>
    </>
  );
};

export default UserScheduler;
