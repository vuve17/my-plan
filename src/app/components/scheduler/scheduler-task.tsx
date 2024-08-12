import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from '@mui/material';
import colors from "@/app/ui/colors";
import type { Task, taskTypeColorTheme } from '@/app/lib/types';
import { getDifferenceInHoursAndMinutes } from '../../lib/date-functions';

interface taskProps {
    task: Task,
    openTaskModal?: (task: Task) => void,
}

function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`
}

const UserTask: React.FC<taskProps> = ({...props}) => {

    const startTime = formatTime(props.task.startDate);
    const endTime = formatTime(props.task.endDate);
    const [description, setDescription] = useState<string>(props.task.description)
    const [height, setHeight] = useState<string | number>()

    function sliceStringAtSpace(inputString : string, maxLength : number) {
        if(maxLength === 0){
            setDescription("")
        } else {
            const str = inputString.substring(0, maxLength) + " ..."
            setDescription(str)
        }
   }

    function descriptionAndHeighLenght(task: Task) {
        console.log(task);
        const diff = getDifferenceInHoursAndMinutes(task.startDate, task.endDate)
        if( diff.hours < 1)
        {
            console.log(1);
            setHeight("calc(100% - 4px)")
            sliceStringAtSpace(task.description, 0)
        } 
        else
        {
            console.log(diff.minutes)
            const percentage = Math.round((diff.minutes/60) * 100)
            const time = (diff.hours * 100) + percentage
            const newHeight = `calc(${time}% - 4px)`
            console.log("newHeight: ", newHeight)
            setHeight(newHeight)
            if (diff.hours > 7)
            {
                console.log(2)
                sliceStringAtSpace(task.description, 250)
            }
        }
    }

    useEffect(() => {
        descriptionAndHeighLenght(props.task)
    }, [])

    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",  
            justifyContent: "space-between",
            position: 'relative',
            width:"calc(100% - 12px)",
            height: height,
            color: colors.tasks[props.task.taskType]?.Text,
            backgroundColor: colors.tasks[props.task.taskType]?.Background,
            border: `2px solid ${colors.tasks[props.task.taskType]?.Stroke}`,
            borderLeft: `10px solid ${colors.tasks[props.task.taskType]?.Stroke}`,
            borderRadius: "4px",
        }}  
        // onClick={openTaskModal}
        >
            <Box 
            sx={{
                display: "flex",
                justifyContent: 'flex-start',
                alignItems: "center",
                fontStyle: 'italic',
                padding: "4px 8px",
            }}
            >
                <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold"
                }}
                >
                    {props.task.title}
                </Typography>
            </Box>

            <Typography
            variant="body1"
            sx={{
                display: "flex",
                justifyContent: 'flex-start',
                margin: "4px 8px",
                fontStyle: 'italic',
                textAlign: "left",
                flexGrow: 1, 
            }}
            >
                {description}
            </Typography>

            <Box
            sx={{
                display: "flex",
                justifyContent: 'flex-end',
                alignItems: "center",
                backgroundColor: colors.tasks[props.task.taskType]?.TimeBackground,
                padding: "4px 8px",
            }}
            >
                <Typography
                sx={{
                    fontStyle: 'italic',
                    fontWeight: "normal",
                }}
                >
                    {startTime} - {endTime}
                </Typography>
            </Box>
        </Box>
    );
}

export default UserTask;
