'use client'

import { Box } from "@mui/material";
import React from "react";
import UserSchedulerCell from "./user-scheduler-cell";
import colors from "@/app/ui/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { headerHeight, columnWidth, fixedDanHeaderWidth } from "@/app/utils/index.js"

interface UserSchedulerColumnProps {
    date: Date,
    onClick: (id:string) => void,
    headingDayName: string,
    headingDate: string,
    colNumber: number,
}


const UserSchedulerColumn: React.FC<UserSchedulerColumnProps> = ({...props}) => {
    
    const isMobile = useSelector((state : RootState) => state.screen.isMobile)

    const daySchedule = [];
    for (let j = 1; j < 25; j++) {
        const current_day_hour = `${(props.date.getMonth() + 1).toString().padStart(2, '0')}${props.date.getDate().toString().padStart(2, '0')}${props.date.getFullYear()}_${j}`;            

            daySchedule.push(
                <UserSchedulerCell 
                    id={current_day_hour} 
                    onClick={props.onClick} 
                    key={current_day_hour}
                    colNumber={props.colNumber}
                />
            )
    }
    
    
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
                        borderBottom: isMobile ? `1px solid ${colors.white}` : `1px solid ${colors.secondaryLightBlue}`,
                        borderLeft: isMobile ? `1px solid white` :  props.colNumber === 0 ? 'none' : `1px solid ${colors.secondaryLightBlue}`,  
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
                            xl: "18px",
                            xxl: "20px",
                        },
                        color: colors.lightBlack

                    }}
                    >
                        <Box sx={{
                            fontSize: {
                                xs: "16px",
                                md: "18px",
                                xl: "18px",
                                xxl: "20px",
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
                        {daySchedule} 
                    </Box>
                    
                </Box>
    )
}

export default UserSchedulerColumn