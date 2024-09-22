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
import { getTasks, convertTaskStringToTask } from "@/app/lib/user-tasks-functions";

interface UserSchedulerColumnProps {
    id: string,
    tasks?: Task | Task[] | null,
    // onClick: (id:string) => void,
    colNumber: number
}


const testTask : Task = {
    id: 1,
    title: "Lorem Ipsum is simply dummy dummy dummy simply dummy simply dummy",
    startDate: new Date("2024-08-02T10:00:00.123Z"),
    endDate: new Date("2024-08-02T19:00:00.123Z"),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    taskType: "event",
}
// 10 , 10
const testTask2 : Task = {
    id: 2,
    title: "Lorem Ipsum is simply dummy dummy dummy simply dummy simply dummy",
    startDate: new Date("2024-08-02T10:00:00.123Z"),
    endDate: new Date("2024-08-02T10:24:00.123Z"),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    taskType: "chore",
}

// 9, 12
const testTask3 : Task= {
    id: 3,
    title: "Lorem Ipsum is simply dummy dummy dummy simply dummy simply dummy",
    startDate: new Date("2024-08-02T09:00:00.123Z"),
    endDate: new Date("2024-08-02T12:24:00.123Z"),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    taskType: "event",
}

const UserSchedulerCell: React.FC<UserSchedulerColumnProps> = ({id, colNumber, tasks}) => {
    
    const dispatch = useDispatch()
    const tasksArray = [testTask, testTask2, testTask3]


    function isTask(task: any): task is Task {
        return (
            task &&
            typeof task.id === 'number' &&
            typeof task.title === 'string' &&
            task.startDate instanceof Date &&
            task.endDate instanceof Date &&
            typeof task.description === 'string' &&
            typeof task.taskType === 'string'
        );
    }
    
    const handleTaskModalState = (id: string) => {
        const dateTime = getChosenDateTime(id)
        dispatch(setTaskModalDate(dateTime.date.toISOString()))
        dispatch(setIsTaskModalActive(true))
        console.log("passed")
    }

    useEffect(() => {
        console.log()
    },[])


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
            <UserDoubleTask task1={tasks[0]} task2={tasks[1]} />
        ) : (
            <UserMutipleTasks tasks={tasks} /> 
        )
    ) : isTask(tasks) ? ( 
        <UserTask task={tasks} /> 
    ) : null 
)

: null }

{/*             
{ tasks !== null  && tasks.tasks !== null ? 

(
    Array.isArray(tasks.tasks) ? ( 
        tasks.tasks.length === 2 ? ( 
            <UserDoubleTask task1={tasks.tasks[0]} task2={tasks.tasks[1]} />
        ) : (
            <UserMutipleTasks tasks={tasks} /> 
        )
    ) : isTask(tasks.tasks) ? ( 
        <UserTask task={tasks.tasks} /> 
    ) : null 
)

: null } */}



            {/* {props.id === "09162024_0" ?
            
            // <UserTask
            // task={testTask}
            
            // /> : null

            // <UserDoubleTask 
            // task1={testTask}
            // task2={testTask2}
            // /> : null

            <UserMutipleTasks
            tasks={tasksArray} 
            /> : null
            } */}

        </Box>
    )
}

export default UserSchedulerCell