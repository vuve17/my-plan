'use client'

import { Box } from "@mui/material";
import React, { useEffect } from "react";
import colors from "@/app/ui/colors";
import { cellHeight } from "@/app/utils";
import type { Task } from "@/app/lib/types";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import UserDoubleTask from "./tasks/scheduler-two-tasks";
import UserTask from "./tasks/scheduler-single-task";
import UserMutipleTasks from "./tasks/scheduler-multiple-tasks";
import { getChosenDateTime} from '../../lib/date-functions';
import { setTaskModalDate, setIsTaskModalActive } from '@/app/redux/create-taks-modal-slice';
import { isTask } from "@/app/lib/user-tasks-functions";
import {  setSelectedTask } from '@/app/redux/tasks-slice';

interface UserSchedulerColumnProps {
    id: string,
    tasks?: Task | Task[] | null,
    colNumber: number
}


const UserSchedulerCell: React.FC<UserSchedulerColumnProps> = ({id, colNumber, tasks}) => {
    
    const dispatch = useDispatch()
    
    const handleTaskModalState = (id: string) => {
        const dateTime = getChosenDateTime(id)
        dispatch(setTaskModalDate(dateTime.date.toISOString()))
        dispatch(setIsTaskModalActive(true))
    }


    return(
        <Box 
            onClick={(event: React.MouseEvent) => {
                handleTaskModalState(event.currentTarget.id)
            }}
            id={id}
            sx={{
                height: {
                    ...cellHeight
                },
                textAlign: "center",
                zIndex: 5,
                borderBottom: `1px solid ${colors.lightGrey}`,
                backgroundColor: "white",
                // paddingTop: "2px"
            }}
        >
        { tasks !== null ? 

        (
            Array.isArray(tasks) ? ( 
                tasks.length === 2 ? ( 
                    <UserDoubleTask 
                    task1={tasks[0]} 
                    task2={tasks[1]} 
                    openUpdateTaskModal={setSelectedTask}
                    />
                ) : (
                    <UserMutipleTasks tasks={tasks} /> 
                )
            ) : isTask(tasks) ? ( 
                <UserTask
                task={tasks}
                openUpdateTaskModal={setSelectedTask}
                /> 
            ) : null 
        )

        : null }

        </Box>
    )
}

export default UserSchedulerCell