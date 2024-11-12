'use client'

import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import colors from "@/app/ui/colors";
import type { Task, TaskString } from '@/app/lib/types';
import { getDifferenceInHoursAndMinutes } from '../../../lib/date-functions';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { convertSingleTaskToTaskString } from "@/app/lib/user-tasks-functions";
import type { UnknownAction } from "@reduxjs/toolkit";

interface taskProps {
    task: Task,
    openUpdateTaskModal: (task: TaskString) => UnknownAction,
}

function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
}

const UserTask: React.FC<taskProps> = ({ task, openUpdateTaskModal }) => {
    const dispatch = useDispatch()
    const startTime = formatTime(task.startDate);
    const endTime = formatTime(task.endDate);
    const [description, setDescription] = useState<string>(task.description);
    const [title, setTitle] = useState<string>(task.title);
    const [height, setHeight] = useState<string | number>();
    const isMobile = useSelector((state: RootState) => state.screen.isMobile);
    const [oneHourTaskWithLongTitle, setOneHourTaskWithLongTitle] = useState<boolean>(false)
    const [topOffset, setTopOffset] = useState<string | number>(0);
    const taskString = convertSingleTaskToTaskString(task)

    function sliceString(inputString: string, func: React.Dispatch<React.SetStateAction<string>>, maxLength: number, oneHourTask: boolean) {
        
            if(inputString.length <= maxLength)
            {
                func(inputString)
            } else {
                const str = inputString.substring(0, maxLength) + "...";
                func(str);
                if(oneHourTask){
                    setOneHourTaskWithLongTitle(true)
                }
            }        
    }
    
    // task < 4, heading 25 po satu
    function descriptionAndHeighLenght(task: Task) {
        const diff = getDifferenceInHoursAndMinutes(task.startDate, task.endDate);
        const startMinutes = task.startDate.getMinutes();
        const topPercentage = (startMinutes / 60) * 100; 
        setTopOffset(`${topPercentage}%`);
        
        if (diff.hours <= 1) {
            setHeight("calc(100% - 4px)");
            sliceString(task.description, setDescription, 0, false);
            sliceString(task.title, setTitle, 15, true)
        } else {
            const percentage = (diff.minutes / 60) * 100;
            const roundedPercentage = Math.round(percentage * 100) / 100;
            const time = (diff.hours * 100) + roundedPercentage;
            const bordersHeight = (diff.hours -1)
            const newHeight = `calc(${time}% - 4px + ${bordersHeight}px )`;
            const charsPerHourDes = 45 * diff.hours;
            const charsPerHourTitle = 10 * diff.hours

            setHeight(newHeight);
            sliceString(task.description, setDescription, charsPerHourDes, false);
            sliceString(task.title, setTitle, charsPerHourTitle, false)
        }
    }

    useEffect(() => {
        descriptionAndHeighLenght(task);
    }, [task]); 

    return (
        <Box
            sx={{
                // position: 'absolute',  // NEW: Make the task absolutely positioned inside its parent cell
                top: topOffset,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: 'relative',
                width: {
                    sm: "calc(100% - 4px)",
                    md: "calc(100% - 12px)",
                    lg: "calc(100% - 12px)",
                },
                height: height,
                color: colors.tasks[task.taskType]?.Text,
                backgroundColor: colors.tasks[task.taskType]?.Background,
                border: `2px solid ${colors.tasks[task.taskType]?.Stroke}`,
                borderLeft: {
                    sm: `2px solid ${colors.tasks[task.taskType]?.Stroke}`,
                    md: `10px solid ${colors.tasks[task.taskType]?.Stroke}`,
                    lg: `10px solid ${colors.tasks[task.taskType]?.Stroke}`,
                },
                borderRadius: "4px",
                overflow: "hidden",             
                cursor: "pointer",           
            }}
            key={task.id}
            onClick={() => dispatch(openUpdateTaskModal(taskString)) }
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: 'flex-start',
                    alignItems: "center",
                    fontStyle: 'italic',
                    padding: {
                        xs: "4px 2px",
                        sm: "4px",
                        lg: "4px 8px",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: {
                            xs: "12px",
                            sm: "14px",
                            md: "18px",
                            lg: "1em",
                            xl: "1em"
                        },
                        textAlign: "left",
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {isMobile ? null : 
            
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

            }


        { oneHourTaskWithLongTitle && isMobile ? null :
            <Box
                sx={{
                    display: "flex",
                    justifyContent: {
                        sm: 'center',
                        md: 'flex-end',
                    },
                    marginTop: {
                        sm: "auto",
                        md: " margin-top: -5px",
                        lg: "auto"
                    },
                    alignItems: "center",
                    backgroundColor: colors.tasks[task.taskType]?.TimeBackground,
                    padding: {
                        xs: "4px 2px",
                        sm: "2px 4px",
                        md: "2px 8px 2px 4px",
                        xl: "4px 8px",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontStyle: 'italic',
                        fontWeight: "normal",
                        fontSize: {
                            xs: "12px",
                            sm: "14px",
                            md: "16px",
                            lg: "16px",
                        },
                        lineHeight: {
                            xs: "1em",
                            sm: "1.5",
                            md: "auto"
                        }
                    }}
                >
                    {startTime} - {endTime}
                </Typography>
            </Box>

        }
        </Box>
    );
}

export default UserTask;
