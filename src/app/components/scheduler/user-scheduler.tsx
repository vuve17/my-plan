'use client'

import React, {useRef, useState} from "react";
import { Box, Grid, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import colors from "@/app/ui/colors";
import CreateTaskModal from "../create-task-modal";
import { NextArrow, PreviousArrow } from './scheduler_utils/scheduler-navigation-arrows';
import UserSchedulerColumn from "./user-scheduler-column";
import TimeTable from "./user-scheduler-day-time";
import CloseIcon from '@mui/icons-material/Close';

interface schedulerProps {
    selected?: Date
}

const width = {
        xl: "80vw",
        lg: "70vw",
        md: "70vw",
        sm: "100%",
        xs: "100%"
}

const columnHeight = {
    lg: "10vh",
    md: "8vh",
    sm: "10vh",
    xs: "12vh"
}

function getChosenDateTime(divId: string) {
    const dateString = divId.indexOf("_");
    const dateBeforeUnderscore = divId.slice(0, dateString);
    const month = dateBeforeUnderscore.slice(0, 2);
    const day = dateBeforeUnderscore.slice(2, 4);
    const year = dateBeforeUnderscore.slice(4, dateString);
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, +month - 1, +day);
    const time = divId.slice(dateString + 1);
  
    return { date, time };
}


const UserScheduler : React.FC<schedulerProps> = ({...props}) => {


    const scheduleHeaderRef = useRef<HTMLDivElement>(null);
    const [taskModalDate, setTaskModalDate] = useState<Date | undefined>(undefined);
    const [taskModalTime, setTaskModalTime] = useState<string | undefined>(undefined);
    const [showTaskModal, setTaskModalState] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(props.selected || new Date())
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState<string>("");
    const [snackbarAlertState, setSnackbarAlertState] = useState<"success" | "warning" | "error">("success");

    const handleTaskModalState = (id: string) => {
        const dateTime = getChosenDateTime(id)
        setTaskModalDate(dateTime.date)
        setTaskModalTime(dateTime.time)
        setTaskModalState(!showTaskModal)
    }

    const handleSnackbarOpen = () => {
        setSnackbarState(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarState(false)
    }

    const handleSnackbarText = (text: string) => {
        setSnackbarText(text)
    }


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

    //staviti sve ovo u 1 line (da se ne ponavlja)
    const startOfWeek = new Date(selectedDate);
    const endOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? 7 : 1))
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    const schedule = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(day.getDate() + i);
        const headingDayName = `${ day.toLocaleDateString('en-US', { weekday: 'long'})}`;
        const headingDate = `${(day.getDate() < 10 ? '0' : '') + day.getDate()}.${(day.getMonth() < 9 ? '0' : '')+ (day.getMonth() + 1)}`;
        const current_day = day.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric' });

        schedule.push(
            <UserSchedulerColumn
                key={current_day}
                onClick={handleTaskModalState}                
                date={day}
                headingDayName={headingDayName}
                headingDate={headingDate}
                colNumber={i}
            />
        )
    }

  
    const scheduleHeader = `${startOfWeek.getDate()}. - ${endOfWeek.getDate()}. ${endOfWeek.toLocaleString('en', {
      month: 'long',
    })}`;

    return(
        <>
            {showTaskModal && 
                <CreateTaskModal 
                cancel={() => setTaskModalState(!showTaskModal)}
                date={taskModalDate}
                time={taskModalTime}
                openSnackbar={handleSnackbarOpen}
                snackbarText={handleSnackbarText}
            />}


            <Snackbar
                open={snackbarState}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message={snackbarText}
                // TransitionComponent={SlideTransition}
            >
                <Alert
                    // onClose={handleClose}
                    severity={snackbarAlertState}
                    variant="filled"
                    sx={{ width: '100%' }}
                    action={action}
                >
                    {snackbarText}
                </Alert>
            </Snackbar>

            <Box
            sx={{
                width: {
                    ...width
                },
                // border: "1px solid black",
                // height: "100%",
            }}
            >
                <Box 
                    id="schedule_header" 
                    ref={scheduleHeaderRef}
                    sx={{
                        display: "flex",
                        padding: "1em 2em 1em 2em",
                        justifyContent: "space-between",
                        top: "0",
                        position: "sticky",
                        
                    }}
                >
                    <Box 
                    sx={{
                        // height: "20px",
                    }}
                    >
                        {scheduleHeader}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 2,
                            height: "30px",
                        }}
                    >
                        <PreviousArrow 
                            height={"14px"}
                        />
                        <NextArrow
                            height={"14px"}
                        />
                    </Box>
                </Box>
                <Box
                    id="schedule"
                    sx={{
                        display:"flex",
                        height:{
                            sm: "100%",
                            lg: `calc(100vh - 142px )`,
                            //80px 62px
                        },
                        width: {
                            ...width
                        },
                        margin: "auto",
                        overflowY: "scroll",
                        // scrollbarColor: "transparent transparent"
                    }}
                >
                    <TimeTable height={columnHeight}/>
                    {schedule}
                </Box>
            </Box>

        </>

    )


}

export default UserScheduler