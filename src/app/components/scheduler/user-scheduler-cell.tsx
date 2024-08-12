'use client'

import { Box } from "@mui/material";
import React, { useEffect } from "react";
import colors from "@/app/ui/colors";
import { cellHeight } from "@/app/utils";
import UserTask from "./scheduler-task";
import type { Task } from "@/app/lib/types";
import { RootState } from "@/app/redux/store";
import { setTest } from "@/app/redux/test-slice";
import { useDispatch, useSelector } from "react-redux";



interface UserSchedulerColumnProps {
    id: string,
    task?: boolean,
    onClick: (id:string) => void,
    colNumber: number
}

const testTask : Task= {
    id: 1,
    title: "Naziv test",
    startDate: new Date("2024-08-02T18:20:30.123Z"),
    endDate: new Date("2024-08-02T18:52:00.123Z"),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    taskType: "event",
}


const UserSchedulerCell: React.FC<UserSchedulerColumnProps> = ({...props}) => {
    
    const dispatch = useDispatch()
    
    return(
        <Box 
            onClick={(event) => {
                props.onClick(event.currentTarget.id)
            }}
            id={props.id}
            sx={{
                height: {
                    ...cellHeight
                },
                textAlign: "center",
                zIndex: 5,
                borderBottom: `1px solid ${colors.lightGrey}`,
                backgroundColor: "white",
            }}
        >

            {props.id === "08132024_0" ?
            
            <UserTask 
            task={testTask}

            /> : null

            }

        </Box>
    )
}

export default UserSchedulerCell