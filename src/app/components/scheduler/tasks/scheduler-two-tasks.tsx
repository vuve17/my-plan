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
    task1: Task,
    task2: Task,
    openUpdateTaskModal: (task: TaskString) => UnknownAction,
}

function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
}

const  UserDoubleTask: React.FC<taskProps> = ({ task1, task2, openUpdateTaskModal }) => {
    
    
    
    const startTime = formatTime(task1.startDate);
    const endTime = formatTime(task1.endDate);
    const startTime2 = formatTime(task2.startDate);
    const endTime2 = formatTime(task2.endDate);

    // const task1StartDate = 
    // console.log("task1: ", task1)
    // console.log("task2: ", task2)
    const dispatch = useDispatch()
    const [description, setDescription] = useState<string>(task1.description);
    const [description2, setDescription2] = useState<string>(task2.description);
    const [title, setTitle] = useState<string>(task1.title);
    const [title2, setTitle2] = useState<string>(task2.title);
    const [height, setHeight] = useState<string | number>("auto");
    const [height2, setHeight2] = useState<string | number>("auto");
    const [isTask1Short, setIsTask1Short] = useState<boolean>(true);
    const [isTask2Short, setIsTask2Short] = useState<boolean>(false);
    const [topOffset1, setTopOffset1] = useState<number | string>("")
    const [topOffset2, setTopOffset2] = useState<number | string>("")

    const task1String = convertSingleTaskToTaskString(task1)
    const task2String = convertSingleTaskToTaskString(task2)

    const test = (new Date(task2.startDate).getHours() ) - (new Date(task1.startDate).getHours())    
    const isMobile = useSelector((state: RootState) => state.screen.isMobile);
    const titleAndDescriptionContainer = isMobile ? "4px" : "8px"

    function getDiffInHours(task1 : Task, task2 : Task) {
        const task1Hours = new Date(task1.startDate).getHours()
        const task2Hours = new Date(task2.startDate).getHours()
        const diff = task1Hours - task2Hours
        return Math.abs(diff) 
    }

    function sliceString(inputString: string, func: React.Dispatch<React.SetStateAction<string>>, maxLength: number) {
        if(inputString.length <= maxLength)
            {
                func(inputString)
            } else {
                const str = inputString.substring(0, maxLength) + "...";
                func(str);
            } 
    }

    function descriptionAndHeightLength(task: Task, 
        setHeightFunc : React.Dispatch<React.SetStateAction<string | number>>,
        setTitleFunc : React.Dispatch<React.SetStateAction<string>>, 
        setDescriptionFunc : React.Dispatch<React.SetStateAction<string>>, 
        setIsTaskShort : React.Dispatch<React.SetStateAction<boolean>>, 
        setTopOffset : React.Dispatch<React.SetStateAction<number | string>>,
        offsetHours : number
    )
        
    {
        const diff = getDifferenceInHoursAndMinutes(task.startDate, task.endDate);
        const percentage = (diff.minutes / 60) * 100;
        const roundedPercentage = Math.round(percentage * 100) / 100;
        const time = (diff.hours * 100) + roundedPercentage;
        const bordersHeight = (diff.hours -1)
        const newHeight = `calc(${time}% - 4px + ${bordersHeight}px)`;
        const charsPerHourDes = 15 * diff.hours;
        const charsPerHourTitle = 10 * diff.hours;
        const startMinutes = task.startDate.getMinutes();
        const topPercentage = (startMinutes / 60) * 100; 
        const totalOffset = (offsetHours * 100) + topPercentage 
        const topOffsetString = `${totalOffset}%`

        if (diff.hours <= 1 ) {
            setHeightFunc("calc(100% - 4px)");
            sliceString(task.description, setDescriptionFunc, 0);
            sliceString(task.title, setTitleFunc, 12)
            setIsTaskShort(true)
            setTopOffset(topOffsetString);
        } else {            
            setTopOffset(topOffsetString);
            setHeightFunc(newHeight);
            sliceString(task.description, setDescriptionFunc, charsPerHourDes);
            sliceString(task.title, setTitleFunc, charsPerHourTitle);
            setIsTaskShort(false)
        }
    }

    useEffect(() => {
        // true - task 1 je prije
        const whosFirst = new Date(task1.startDate) < new Date(task2.startDate)  
        const offsetHours = getDiffInHours(task1, task2)
        descriptionAndHeightLength(task1, setHeight, setTitle, setDescription, setIsTask1Short, setTopOffset1, whosFirst ? 0 : offsetHours);
        descriptionAndHeightLength(task2, setHeight2, setTitle2, setDescription2, setIsTask2Short, setTopOffset2, whosFirst ? offsetHours : 0);
    }, [task1, task2]);

    return (

        <Box
            sx={{
                display: "flex",
                width: "100%", 
                height: "inherit",
            }}
        >
            <Box
                sx={{
                    
                    position: 'relative',
                    top: topOffset1,
                    display: "flex",
                    flexDirection : "column",
                    width: "50%",
                    height: height,
                    verticalAlign: "top",
                    color: colors.tasks[task1.taskType]?.Text,
                    backgroundColor: colors.tasks[task1.taskType]?.Background,
                    border: {
                        xs: `1px solid ${colors.tasks[task1.taskType]?.Stroke}`,
                        sm : `2px solid ${colors.tasks[task1.taskType]?.Stroke}`,
                        md: `2px solid ${colors.tasks[task1.taskType]?.Stroke}`
                    },
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexGrow: 1,
                    cursor: "pointer",                  
                }}
                key={task1.id}
                onClick={() => dispatch(openUpdateTaskModal(task1String)) }
                // onClick={() => openTaskModal(task1)}
            >
                 <Box
                    sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <Box
                    >
                        <Typography
                            sx={{
                                display: "inline-block",
                                fontWeight: "bold",
                                fontStyle: 'italic',
                                fontSize: {
                                    xs: "12px",
                                    sm: "14px",
                                    md: "18px",
                                    lg: "16px",
                                    xl: "1em",
                                },
                                textAlign: "left",
                                marginBottom: isTask1Short ? "0px" : "8px",
                                padding: isMobile ? "4px" : "8px",

                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
        
                    <Box>
                        <Typography
                            
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontStyle: 'italic',
                                textAlign: "left",
                                padding: isTask1Short ? "0px" : (isMobile ? "4px" : "8px"),
                                fontSize: {
                                    xs: "0px",
                                    sm: "0px",
                                    md: "0px",
                                    lg: "0px",
                                    xl: "14px"
                                },
                            }}
                        >
                            {isMobile ? null : description}
                        </Typography>
                    </Box>
               
                </Box>
    
                <Box
                    
                    sx={{
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: colors.tasks[task1.taskType]?.TimeBackground,
                        padding: {
                            xs : "2px 0px", 
                            md : "2px 4px",
                        },
                        cursor: "pointer",
                        
                    }}
                >
                    <Typography
                    
                        sx={{
                            display: "block",
                            fontStyle: 'italic',
                            fontWeight: {
                                xs: "bold",
                                sm : "normal",
                            },
                            fontSize: {
                                xs: "8px",
                                sm: "10px",
                                md: "12px",
                                lg: "0.6vw",
                                xl: "14px"
                            },                          
                        }}
                    >
                        {startTime} - {endTime}
                    </Typography>
                </Box>
            </Box>
    
    
            <Box
                sx={{
                    position: 'relative',
                    top: topOffset2,
                    display: "flex",
                    flexDirection : "column",
                    width: "50%",
                    height: height2,
                    verticalAlign: "top",
                    color: colors.tasks[task2.taskType]?.Text,
                    backgroundColor: colors.tasks[task2.taskType]?.Background,
                    border: {
                        xs: `1px solid ${colors.tasks[task2.taskType]?.Stroke}`,
                        sm : `2px solid ${colors.tasks[task2.taskType]?.Stroke}`,
                        md: `2px solid ${colors.tasks[task2.taskType]?.Stroke}`
                    },
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexGrow: 1,
                    cursor: "pointer",
                }}
                key={task2.id}
                onClick={() => dispatch(openUpdateTaskModal(task2String)) }
            >
                 <Box
                    sx={{
                        flex: "1 1 auto",
                        height: `calc(100%)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}
                >
                    <Box
                    >
                        <Typography
                            sx={{
                                display: "inline-block",
                                fontStyle: 'italic',
                                fontWeight: "bold",
                                fontSize: {
                                    xs: "12px",
                                    sm: "14px",
                                    md: "18px",
                                    lg: "16px",
                                    xl: "1em",
                                },
                                textAlign: "left",
                                marginBottom: isTask2Short ? "0px" : "8px",
                                padding: isMobile ? "4px" : "8px",
                            }}
                        >
                            {title2}
                        </Typography>
                    </Box>
        
                    <Box>
                        <Typography
                            
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                fontStyle: 'italic',
                                textAlign: "left",
                                padding: isTask2Short ? "0px" : (isMobile ? "4px" : "8px"),
                                fontSize: {
                                    xs: "0px",
                                    sm: "0px",
                                    md: "0px",
                                    lg: "0px",
                                    xl: "14px"
                                },
                            }}
                        >
                            {isMobile ? null : description2}
                        </Typography>
                    </Box>
               
                </Box>
    
                <Box
                    
                    sx={{
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: colors.tasks[task2.taskType]?.TimeBackground,
                        padding: {
                            xs : "2px 0px", 
                            md : "2px 4px",
                        }
                        
                    }}
                >
                    <Typography
                    
                        sx={{
                            display: "block",
                            fontStyle: 'italic',
                            fontWeight: {
                                xs: "bold",
                                sm : "normal",
                            },
                            fontSize: {
                                xs: "8px",
                                sm: "10px",
                                md: "12px",
                                lg: "12px",
                                xl: "14px"
                            },
                        }}
                    >
                        {startTime2} - {endTime2}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default UserDoubleTask;
