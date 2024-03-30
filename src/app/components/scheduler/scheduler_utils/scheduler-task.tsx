'use client'

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import colors from "../../../ui/colors";
import { Task } from "../../../lib/types";

interface TaskProps extends Task {
    onClick: () => void,
}

const ScheduleTask: React.FC<TaskProps> = ({...props}) => {


    return(
        <Box
        
        sx={{
            border: `2px solid ${colors.tasks.chore.Stroke}`,
            borderLeft: `6px solid ${colors.tasks.chore.Stroke}`,
            boxSizing: "border-box",
            backgroundColor: `${colors.tasks.chore.Background}`,
            position: "inherit",
            width: {
                lg: "3vw",
            },
        }}
        
        >
            <Box
            
            >
                <Typography 
                variant="h3"
                style={{
                    color: `${colors.tasks.chore.Text}`,
                }}
                gutterBottom
                >
                    {props.title}
                </Typography>
                
            </Box>
            
            <Box
            >
            <Typography 
                variant="h3"
                style={{
                    color: `${colors.tasks.chore.Text}`,

                }}
                gutterBottom
                >
                {props.description}
            </Typography>
            </Box>
            <Box
            sx={{
                fontStyle: "italic",
                right: 0
            }}
            >

            </Box>
        </Box>
    )
}

export default ScheduleTask