'use client'

import { Box } from "@mui/material";
import React,  { useState }  from "react";
import colors from "@/app/ui/colors";
import { useSelector } from 'react-redux';
import { RootState } from "@/app/redux/store";
import { headerHeight } from "@/app/utils/index.js"
import { cellHeight, timeTableWidth, marginTopClassDanScheduler } from "@/app/utils";


const TimeTable: React.FC = () => {
    
    const [timeList, setTimeList] = useState<React.ReactNode[]>([]);
    const isMobile = useSelector((state : RootState) => state.screen.isMobile)


    useState(() => {
        const list = [];
        for (let i = 1; i < 24; i++) {
          const hour = `${(i < 10 ? '0' : '') + i}:00`;
          list.push(
            <Box
              key={hour}
              className="hour"
              sx={{
                borderBottom: '1px solid black',
                height: {...cellHeight},
                position: 'relative',              
                
              }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        top: "100%",
                        left: isMobile ? "-18px" : "-32px",
                        transform: "translateY(-50%)",
                        backgroundColor: colors.white,
                    }}
                  >
                      {hour}
                  </Box>
            </Box>
          );
        }
        setTimeList(list);
      });
    


    return(
        <Box
          sx={{
            width:{
              ...timeTableWidth
            },
            zIndex: 12,
            position: "relative",
            backgroundColor: colors.white, 
            left: 0,
            marginTop: {
              ...marginTopClassDanScheduler
            },
          }}
        >
            <Box
                className="dan_header"
                sx={{
                    display: "flex",
                    position:"fixed",
                    backgroundColor: colors.white,
                    height: {
                    ...headerHeight
                    },
                    width : {
                      xs : "inherit",
                      sm : "inherit",
                      md : "inherit",
                      lg: "3.7%",
                      xl : "4.2vw",
                    },
                    textAlign: "center",
                    zIndex: 12,
                    top: "calc(62px + 79px)",
                    borderBottom: "3px solid white"
                }}
            >

            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: {
                  xs: 0,
                  sm: "0.5em",
                  md: "1em"
                },
                alignItems: "flex-end",
                zIndex: 2,
                fontSize:  isMobile ? "12px" : "16px",
                marginTop:{
                  ...headerHeight
                }
            }}
            >
                {timeList}
            </Box>

        </Box>
    )
}

export default TimeTable