'use client'

import React, {useRef, useState} from "react";
import { Box, Grid, Typography } from '@mui/material';
import colors from "../ui/colors";
import TaskMenu from "./task-menu";
import CreateTaskModal from "./create-task-modal";

interface currentDisplayDateProps {
    newDate?: Date,
    smallDevice: boolean
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
  


const Scheduler : React.FC<currentDisplayDateProps> = ({...props}) => {
    
    const scheduleHeaderRef = useRef<HTMLDivElement>(null);
    const [taskModalDate, setTaskModalDate] = useState<Date | undefined>(undefined);
    const [taskModalTime, setTaskModalTime] = useState<string | undefined>(undefined);
    const [showTaskModal, setTaskModalState] = useState(false);


    const handleTaskModalState = (id: string) => {
        const dateTime = getChosenDateTime(id)
        setTaskModalDate(dateTime.date)
        setTaskModalTime(dateTime.time)
        setTaskModalState(!showTaskModal)
    }




    const current_date = props.newDate || new Date()
    const week_number = current_date.getDay() === 0 ? 7 : current_date.getDay();
    const day_of_week = current_date.getDay();
    const startOfWeek = new Date(current_date);
    startOfWeek.setDate(current_date.getDate() - day_of_week + (day_of_week === 1 ? 1 : 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
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
                height: "10vh",
                width:{
                    sm: "12.5vw",
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
                            sm: "12.5 vw",
                            lg: "10vw"
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
            <ul className="dan" key={current_day}>
                <li className="dan_header"
                style={{backgroundColor: colors.white, zIndex: 5,}}
                >
                    <Box
                    sx={{
                        position:"relative",
                        border: "1px solid black",
                        height: "6vh",
                        width:{
                            sm: "12.5 vw",
                            lg: "10vw"
                        },
                        textAlign: "center",
                        zIndex: 5,
                        
                    }}
                    >
                        {dayFormatted}
                    </Box>     
                </li>
                {daySchedule}
            </ul>
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
                    marginLeft: "0"
                }}
                >
                    <li className="dan_header">
                        <div style={{ position: "relative", height: "6vh", marginBottom: "0"}}></div>
                    </li>
                    {renderTimeList()}
            </ul>
    
            {schedule}
                
               </Box>
             </Box>
         </Box>
         {props.smallDevice ? <TaskMenu/> : null }
        </div>
    </>

    )
}

export default Scheduler