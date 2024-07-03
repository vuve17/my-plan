'use client'

import React, {useEffect, useRef, useState} from "react";
import { Box, Grid, Typography, IconButton, Snackbar, Alert, Button } from '@mui/material';
import colors from "@/app/ui/colors";
import CreateTaskModal from "../create-task-modal";
import { NextArrow, PreviousArrow } from './scheduler_utils/scheduler-navigation-arrows';
import UserSchedulerColumn from "./user-scheduler-column";
import TimeTable from "./user-scheduler-day-time";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/app/redux/store";
import { setSelectedDate } from '@/app/redux/selected-date-slice';
import { headerHeight } from '@/app/utils/index.js';


export const dynamic = 'force-dynamic'


const width = {
        xl: "80vw",
        lg: "70vw",
        md: "100vw",
        sm: "100vw",
        xs: "100vw"
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


const UserScheduler : React.FC = () => {


    const scheduleHeaderRef = useRef<HTMLDivElement>(null);
    // potencijalo spojiti selectedDate i selectedStringDate
    const selectedStringDate = useSelector((state: RootState) => state.selectedDate.selectedDate)
    const [taskModalDate, setTaskModalDate] = useState<Date | undefined>(undefined);
    const [taskModalTime, setTaskModalTime] = useState<string | undefined>(undefined);
    const [showTaskModal, setTaskModalState] = useState(false);
    const [selectedDate, setSelecteStateDate] = useState<Date>(new Date(selectedStringDate))
    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarText, setSnackbarText] = useState<string>("");
    const [snackbarAlertState, setSnackbarAlertState] = useState<"success" | "warning" | "error">("success");
    const [prevWeekArrow, setPrevWeekArrow] = useState<boolean>(false);
    const [nextWeekArrow, setNextWeekArrow] = useState<boolean>(false);
    const isMobile = useSelector((state: RootState) => state.screen.isMobile);
    const minDate = new Date()
    const maxDateNumber: number = isMobile ? 24 : 12
    const maxDate = new Date(minDate.setMonth(minDate.getMonth() + maxDateNumber))  
    const weekdayFormat = isMobile ? 'short' : 'long';
    const [scheduleHeader, setScheduleHeader] = useState<string>('');
    const [schedule, setSchedule] = useState<JSX.Element[]>([]);
    const dispatch = useDispatch()

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


    const nextWeekFunc = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(selectedDate.getDate() + 7)
        const newDateToString = newDate.toISOString()
        dispatch(setSelectedDate(newDateToString)) 
    } 

    const previousWeekFunc = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(selectedDate.getDate() - 7)
        const newDateToString = newDate.toISOString()
        dispatch(setSelectedDate(newDateToString)) 
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


    const weekDayGenerator = (selectedDate : Date) => {
        const startOfWeek = new Date(selectedDate);
        const endOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? -6 : 1))
        endOfWeek.setDate(startOfWeek.getDate() + 6)

        console.log(startOfWeek)
        console.log(endOfWeek)

        const newSchedule = [];

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            const headingDayName = `${ day.toLocaleDateString('en-US', { weekday: weekdayFormat})}`;
            const headingDate = `${(day.getDate() < 10 ? '0' : '') + day.getDate()}.${(day.getMonth() < 9 ? '0' : '')+ (day.getMonth() + 1)}`;
            const current_day = day.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric' });

            newSchedule.push(
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

        const newScheduleHeader = `${startOfWeek.getDate()}. - ${endOfWeek.getDate()}. ${endOfWeek.toLocaleString('en', {
        month: 'long',
        })}`;

        return {newSchedule, newScheduleHeader}

    }

    
    useEffect(() => {
        setSelecteStateDate(new Date(selectedStringDate));
    }, [selectedStringDate]);

    useEffect(() => {
        const { newSchedule, newScheduleHeader } = weekDayGenerator(selectedDate);
        setSchedule(newSchedule);
        setScheduleHeader(newScheduleHeader);
    }, [selectedDate]);

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
                            xs: 'calc(100% - 4em)', 
                            sm: 'calc(100% - 4em)',
                            md: 'calc(100% - 4em)',
                            lg: 'calc(70vw - 4em)', 
                            xl: 'calc(80vw - 4em)' 
                        },      
                        marginBottom: {
                            ...headerHeight
                        }
                    }}
                >
                    { 
                    isMobile ? null :
                    <Box 
                    sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                        {scheduleHeader}
                    </Box>
                  
                }
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
                            color={isMobile ? colors.white : ''}
                            
                        />
                        {     isMobile ?      
                        <Box 
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                        }}
                        >
                            {scheduleHeader}
                         </Box> 
                         
                        : null 
                        }

                        <NextArrow
                            height={"14px"}
                            onClick={nextWeekFunc}
                            hidden={nextWeekArrow}
                            color={isMobile ? colors.white : ''}
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
                            ...width
                        },
                        marginTop: 0,
                        position: isMobile ? "relative" : "fixed",
                        bottom: 0,
                        // overflow: isMobile ? "auto" : "none" ,
                        overflowY: 'auto',
                        overflowX: isMobile ? 'auto' : 'hidden',
                        '&::-webkit-scrollbar': {
                            display: isMobile ? 'auto' : 'none', 
                        },
                        msOverflowStyle: isMobile ? 'auto' : 'none', 
                        scrollbarWidth: 'none', 
                    }}
                >
                    <TimeTable/>
                    {schedule}      
                </Box>
            </Box>

        </>

    )


}

export default UserScheduler