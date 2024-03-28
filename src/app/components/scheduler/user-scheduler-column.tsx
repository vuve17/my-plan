'use client'

import { Box } from "@mui/material";
import React from "react";
import UserSchedulerCell from "./user-scheduler-cell";
import colors from "@/app/ui/colors";
import TimeTable from "./user-scheduler-day-time";


interface UserSchedulerColumnProps {
    date: Date,
    onClick: (id:string) => void,
    // dateFormated: string,
    headingDayName: string,
    headingDate: string,
    colNumber: number,
}

const danHeaderHeight = {
    lg: "10vh",
    md: "8vh",
    sm: "10vh",
    xs: "12vh"
}

const UserSchedulerColumn: React.FC<UserSchedulerColumnProps> = ({...props}) => {
    

    const daySchedule = [];
    for (let j = 1; j < 25; j++) {
        const current_day_hour = `${(props.date.getMonth() + 1).toString().padStart(2, '0')}${props.date.getDate().toString().padStart(2, '0')}${props.date.getFullYear()}_${j}`;            

            daySchedule.push(
                <UserSchedulerCell 
                    id={current_day_hour} 
                    onClick={props.onClick} 
                    key={current_day_hour}
                    colNumber={props.colNumber}
                />
            )
    }
    
    
    return(
                <Box
                    className="dan"
                    sx={{
                        position: "relative",
                        backgroundColor: colors.white, 
                        zIndex: 5,
                        width:"13.5%",
                        border: "2px solid red",                       
                    }}
                >
                    <Box
                    className="dan_header"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "sticky",
                        border: "1px solid black",
                        height: {
                          ...danHeaderHeight
                        },
                        textAlign: "center",
                        zIndex: 5,
                    }}
                    >
                        <div>
                            {props.headingDayName}
                        </div>
                        <div>
                            {props.headingDate}
                        </div>
                    </Box>   
                    {daySchedule}  
                </Box>
    )
}

export default UserSchedulerColumn