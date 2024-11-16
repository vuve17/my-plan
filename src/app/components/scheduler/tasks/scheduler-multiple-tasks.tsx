'use client'

import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import colors from "@/app/ui/colors";
import type { Task,  UserTasksValuePairFormat } from '@/app/lib/types';
import { getDifferenceInHoursAndMinutes } from '../../../lib/date-functions';
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";


interface taskProps {
    tasks: Task[],
}

function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
}

const UserMutipleTasks: React.FC<taskProps> = ({ 
    tasks,
    // openTaskModal
    }) => {

    const [title, setTitle] = useState<string>("");
    const [height, setHeight] = useState<string | number>();
    const isMobile = useSelector((state: RootState) => state.screen.isMobile);
    const tasksStartTimes : Date[] = []
    const tasksEndTimes : Date[] = []
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [taskArray, setTaskArray] = useState<React.JSX.Element[]>([]);
    const [taskTooShortToDisplayAll, setTaskTooShortToDisplayAll] = useState<boolean>(false)
    const [topOffset, setTopOffset] = useState<string | number>(0);

    function findEarliestTime (dates : Date[]) { 
        let earliestDate = dates[0];

        for (let i = 1; i < dates.length; i++) {
            if (dates[i]  < earliestDate) {
                earliestDate = dates[i];
            }
        }
        // console.log("earliestDate",earliestDate)

        setStartTime(earliestDate)         
    }

    function findLatestTime (dates : Date[]) {
        let latestDate = dates[0];

        for (let i = 1; i < dates.length; i++) {
            if (dates[i]  > latestDate) {
                latestDate = dates[i];
            }
        }
        // console.log("latestDate",latestDate)
        setEndTime(latestDate)         
    }

    function sliceString(inputString: string, maxLength: number) {
        if (maxLength === 0) {
            return ""
        } else {
            const str = inputString.substring(0, maxLength) + " ...";
            return str
        }
    }

    function multipleTasksHeight() {
        if(startTime && endTime){
            console.log(startTime, " " , endTime)
            const diff = getDifferenceInHoursAndMinutes(new Date(startTime), new Date(endTime));
            // console.log("diff: ", diff)

            const mutipleTasksTitle =  `${tasks.length} tasks occuring`
            
            const startMinutes = startTime.getMinutes();
            const topPercentage = (startMinutes / 60) * 100; 
            setTopOffset(`${topPercentage}%`);
            
            if (diff.hours <= 1) {
                setTaskTooShortToDisplayAll(true)
                setHeight("calc(100% - 4px)");
                setTitle(mutipleTasksTitle)
            } else {
                setTaskTooShortToDisplayAll(diff.hours <= 3 ? true : false)
                const percentage = (diff.minutes / 60) * 100;
                const roundedPercentage = Math.round(percentage * 100) / 100;
                const time = (diff.hours * 100) + roundedPercentage;
                const bordersHeight = (diff.hours -1)
                const newHeight = `calc(${time}% - 4px + ${bordersHeight}px)`;

                setHeight(newHeight);
                setTitle(mutipleTasksTitle)
            }
        }
    }

    function structureMultipleTaskElement (tasks : Task[]) {

        tasksStartTimes.length = 0
        tasksEndTimes.length = 0  
        const newTaskArray: React.JSX.Element[] = [];
        
        tasks.forEach((task : Task ) => {
            tasksStartTimes.push(task.startDate)
            tasksEndTimes.push(task.endDate)
            const startTime = formatTime(task.startDate);
            const endTime = formatTime(task.endDate);
            const taskTitle = sliceString(task.title, 25);
            
            newTaskArray.push
            (
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                }}
                key={task.id}
                >
                <Box 
                    // onClick={openTaskModal(task)}
                    sx={{
                        display: "flex",
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
                                md: "1em",
                                lg: "1.2em",
                                xl: "1.5em"
                            },
                            textAlign: "left",
                        }}
                    >
                        {taskTitle}
                    </Typography>
                </Box>
    
    
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        padding: {
                            xs: "4px 8px",
                            sm: "4px 8px",
                            md: "4px 8px",
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
                   
                </Box>
            )
        })

        setTaskArray(newTaskArray);
        findEarliestTime(tasksStartTimes)
        findLatestTime(tasksEndTimes)
    }
    
    useEffect(() => {
        if (tasks.length > 0) {
            structureMultipleTaskElement(tasks);
        }
    }, [tasks]);

    useEffect(() => {
        if (startTime && endTime) {
            multipleTasksHeight();
        }
    }, [startTime, endTime]);

    return (
        <Box
            sx={{
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
                color: colors.tasks.multiple.Text,
                backgroundColor: colors.tasks.multiple.Background,
                border: `2px solid ${colors.tasks.multiple.Stroke}`,
                borderLeft: {
                    sm: `2px solid ${colors.tasks.multiple?.Stroke}`,
                    md: `10px solid ${colors.tasks.multiple.Stroke}`,
                    lg: `10px solid ${colors.tasks.multiple.Stroke}`,
                },
                borderRadius: "4px",
                overflow: "hidden",
            }}
            // onClick={() => openTaskModal?.(tasks)}
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
                                md: "1em",
                                lg: "1.2em",
                                xl: "1.5em"
                            },
                            textAlign: "left",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            { taskTooShortToDisplayAll ? taskArray : null}
        </Box>
    );
}

export default UserMutipleTasks;
