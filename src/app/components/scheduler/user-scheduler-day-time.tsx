'use client'

import { Box } from "@mui/material";
import React,  { useState }  from "react";
import colors from "@/app/ui/colors";
import { useSelector } from 'react-redux';
import { RootState } from "@/app/redux/store";
import { headerHeight } from "@/app/utils/index.js"
import { cellHeight, timeTableWidth } from "@/app/utils";

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
                        left: isMobile ? "-20px" : "-30px",
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
                    width: "inherit",
                    textAlign: "center",
                    zIndex: 12,
                    top: "calc(62px + 79px)"
                }}
            >

            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "1em",
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