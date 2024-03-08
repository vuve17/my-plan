'use client'

import React, {useRef, useState} from "react";
import { Box, Grid, Typography } from '@mui/material';
import colors from "../ui/colors";
import TaskMenu from "./task-menu";
import CreateTaskModal from "./create-task-modal";
import ScheduleTask from "./scheduler-task";

interface currentDisplayDateProps {
    selectedDate?: Date,
    smallDevice?: boolean
}

// function appendChild(){
//     const targetedDiv = document.getElementById("01182024_2")
//     targetedDiv?.appendChild(<ScheduleTask/>)
// }

const columnWidth = {
    md: "13vw",
    lg: "10vw"
}

const columnHeight = {
    lg: "6vh",
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
  

const SchedulerSmall : React.FC<currentDisplayDateProps> = ({...props}) => {
    
    const scheduleHeaderRef = useRef<HTMLDivElement>(null);
    const [taskModalDate, setTaskModalDate] = useState<Date | undefined>(undefined);
    const [taskModalTime, setTaskModalTime] = useState<string | undefined>(undefined);
    const [showTaskModal, setTaskModalState] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(props.selectedDate || new Date())

    const handleTaskModalState = (id: string) => {
        const dateTime = getChosenDateTime(id)
        setTaskModalDate(dateTime.date)
        setTaskModalTime(dateTime.time)
        setTaskModalState(!showTaskModal)
    }

    console.log(selectedDate)
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? 7 : 1))
    const endOfWeek = new Date(selectedDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    const day_of_week = selectedDate.getDay();

    console.log(startOfWeek, endOfWeek)

  
    const scheduleHeader = `${startOfWeek.getDate()}. - ${endOfWeek.getDate()}. ${endOfWeek.toLocaleString('en', {
      month: 'long',
    })}`;

    const renderTimeList = () => {
        const timeList = [];
        for (let i = 0; i < 24; i++) {
          const hour = `${(i < 10 ? '0' : '') + i}:00`;
          timeList.push(
            <li key={i} 
            style={{
                paddingRight: "0.5em"
            }}
            >
              <Box 
              className="hour"
              sx={{
                textAlign: "right",
                border: "2px solid transparent",
                position: "relative",
                height: {
                    ...columnHeight
                },
                //"10vh",
                width:{
                    // sm: "vw",
                    lg: "3vw",

                },
              }}
              >
                {hour}
              </Box>
            </li>
          );
        }
        return timeList;
      };

    const schedule = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayFormatted = `${ day.toLocaleDateString('en-US', { weekday: 'long'})}
        ${(day.getDate() < 10 ? '0' : '') + day.getDate()}.${(day.getMonth() < 9 ? '0' : '') + (day.getMonth() + 1)}`;
        const current_day = day.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'numeric' });
        const daySchedule = [];
        for (let j = 0; j < 24; j++) {
            const current_day_hour = `${(day.getMonth() + 1).toString().padStart(2, '0')}${day.getDate().toString().padStart(2, '0')}${day.getFullYear()}_${j}`;            daySchedule.push(
                <li key={current_day_hour} >
                    <Box 
                    onClick={(event) => {
                        handleTaskModalState(event.currentTarget.id)
                        }}
                    id={current_day_hour}
                    sx={{
                        border: `1px solid ${colors.lightGrey} `,
                        height: "10vh",
                        width:{
                            xs: "90vw",
                            sm:"90vw",
                            ...columnWidth
                        },
                        textAlign: "center",
                        zIndex: 5,
                    }}
                    >

                    </Box>
                </li>
            );
        }

        schedule.push(
            <Box 
            className="dan" 
            key={current_day}
            sx={{
                backgroundColor: colors.white, zIndex: 5,
                padding: "5 5 5 5"
            }}
            >
                <li className="dan_header"
                style={{
                }}
                >
                    <Box
                    sx={{
                        position:"relative",
                        border: "1px solid black",
                        height: {
                          ...columnHeight
                        },
                        width:{
                            xs: "13vw",
                            sm: "13vw",
                            ...columnWidth
                        },
                        textAlign: "center",
                        zIndex: 5,
                        
                        // paddingleft: {
                        //     lg: "auto",
                        //     md: "1em",

                        // }
                    }}
                    >
                        {dayFormatted}
                    </Box>     
                </li>
                {daySchedule}
            </Box>
        );
    }

    return(
        <>
       {showTaskModal && 
        <CreateTaskModal 
        cancel={() => setTaskModalState(!showTaskModal)}
        date={taskModalDate}
        time={taskModalTime}
        />}
        <div>
        

        <Box 
            id="schedule_header" 
            ref={scheduleHeaderRef}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1em 2em 0 2em",
                top: "0",
                position: "sticky",
                paddingBottom: "5px",
            }}
        >
            <div >{scheduleHeader}</div>
            <div >{scheduleHeader}</div>
        </Box>
        <Box id="wrapper"
        >
         <Box id="schedule"
            sx={{
            height:{
                sm: "100%",
                lg: `calc(100vh - 71px )`,

            },
            margin: "auto",
            overflowY: "scroll",
            scrollbarColor: "transparent transparent"
            }}
         >
            
             <Box id="schedule_days"
             sx={{
                height:{
                    sm: "100%",
                    lg: `calc(100vh - 71px - ${scheduleHeaderRef})`
                }
             }}
             
             >
                <ul id="vrijeme"
                style={{
                    listStyle: "none",
                    marginTop: "0",
                    paddingLeft: 0
                }}
                >
                    <li className="dan_header">
                        <Box 
                        sx={{ 
                            position: "relative", 
                            height: "6vh", 
                            marginBottom: {
                                xs: "5vh",
                                sm: "3vh",
                                lg: 0
                            }
                        }}
                        
                        >

                        </Box>
                    </li>
                    {renderTimeList()}
            </ul>
    
            {schedule}
                
               </Box>
             </Box>
         </Box>
         {/* {props.smallDevice ? <TaskMenu device={props.smallDevice}/> : null } */}
        </div>
    </>

    )
}

export default SchedulerSmall