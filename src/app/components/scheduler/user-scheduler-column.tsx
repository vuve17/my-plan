'use client'

import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import UserSchedulerCell from "./user-scheduler-cell";
import colors from "@/app/ui/colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { headerHeight, columnWidth, fixedDanHeaderWidth, marginTopClassDanScheduler } from "@/app/utils/index.js"
import { convertTaskStringToTask, getTasks } from '../../lib/user-tasks-functions';
import { setTasks } from "@/app/redux/tasks-slice"; 

interface UserSchedulerColumnProps {
    date: Date,
    headingDayName: string,
    headingDate: string,
    colNumber: number,
}


const UserSchedulerColumn: React.FC<UserSchedulerColumnProps> = ({...props}) => {
    
    const dispatch = useDispatch()
    const isMobile = useSelector((state : RootState) => state.screen.isMobile)
    const tasksStringifyed = useSelector((state: RootState) => state.tasks.tasks)
    const tasks = tasksStringifyed ? convertTaskStringToTask(tasksStringifyed) : null
    
    const generatedSchedulerCells = useMemo(() => {
        const daySchedule = [];
        for (let j = 0; j < 24; j++) {
        const current_day_hour = `${(props.date.getMonth() + 1).toString().padStart(2, '0')}${props.date.getDate().toString().padStart(2, '0')}${props.date.getFullYear()}_${j}`;            

            daySchedule.push(
                <UserSchedulerCell 
                    id={current_day_hour} 
                    key={current_day_hour}
                    colNumber={props.colNumber}
                    tasks={ tasks ? tasks[current_day_hour] : null}
                />
            )
         }
         return daySchedule
    }, [tasks, props.date, props.colNumber]);
    
    // useEffect(() => {
    //     async function fetchAndSetTasks() { 
    //         try {
    //             const fetchedTasks = await getTasks(); 
    //             if (fetchedTasks) {
    //                 dispatch(setTasks(fetchedTasks)); 
    //             }
    //         } catch (error) {
    //             console.error("Error fetching tasks:", error); 
    //         }
    //     }
    //     fetchAndSetTasks(); 
    // }, [dispatch]);

    //  }
//     taskType: 'chore'
//     taskType: 'chore'
//   }
// }
    
    
    return(
                <Box
                    className="dan"
                    sx={{
                        position: "relative",
                        backgroundColor: colors.white, 
                        padding: 0,
                        margin: 0,
                        zIndex: 10,
                        width:{
                            ...columnWidth
                        }, 
                        marginTop: {
                            ...marginTopClassDanScheduler
                        },
                    }}
                >
                    <Box
                    className="dan_header"
                    sx={{
                        position: "fixed",
                        top: "calc(62px + 79px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.white, 
                        borderBottom: `3px solid ${colors.primaryBlue}`,
                        borderLeft:  `1px solid ${colors.white}`,  
                        height: {
                          ...headerHeight
                        },
                        width: {
                            ...fixedDanHeaderWidth
                        },
                        textAlign: "center",
                        zIndex: 20,
                        fontWeight:  700,
                        fontSize: {
                            xs: "14px",
                            md: "16px",
                            lg: "18px",
                            xl: "20px"
                        },
                        color: colors.lightBlack

                    }}
                    >
                        <Box sx={{
                            fontSize: {
                                xs: "18px",
                                md: "20px",
                                lg: "18px",
                                xl: "20px"
                            },
                            width:"100%"
                        }}>
                            {props.headingDayName}
                        </Box>
                        <Box 
                            sx={{
                                width:"100%"
                            }}
                        >
                            {props.headingDate}
                        </Box>
                    </Box>   
                    <Box
                        sx={{
                            position: "relative",
                            borderBottom: `1px solid ${colors.secondaryLightBlue}`,
                            borderLeft:  props.colNumber === 0 ? 'none' : `1px solid ${colors.primaryBlue}`,    
                            paddingTop: {
                                ...headerHeight
                            }         
                        }}
                        
                    >
                        {generatedSchedulerCells} 
                    </Box>
                    
                </Box>
    )
}

export default UserSchedulerColumn