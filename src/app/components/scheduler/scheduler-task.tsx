import React from "react";
import { Box, Grid, Typography, IconButton, } from '@mui/material';
import colors from "@/app/ui/colors";
import type { Task } from '@/app/lib/types';

interface taskProps {
    task: Task,
    openTaskModal: (task: Task) => void,

}

function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 

    return `${hours}:${minutes}`
} 



const Task: React.FC<taskProps> = ({...props}) => {

    const startTime = formatTime(props.task.startDate);
    const endTime = formatTime(props.task.endDate);
    const openTaskModal = () => {
        props.openTaskModal(props.task)
    }


    return (
        <Box
        
        sx={{
            //promijeniti with na 50% ili 100% ovisno o broju taskova
            width:"100%",
        }}  
        onClick={openTaskModal}
        >
            <Typography
            
            >
                {props.task.title}
            </Typography>

            <Typography
            
            >
                {props.task.description}
            </Typography>

            <Typography
            
            >
                {startTime} - {endTime}
            </Typography>
        </Box>
    );
}

export default Task;