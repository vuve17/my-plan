'use client'

import { Box } from "@mui/material";
import React,  { useState }  from "react";

interface timeListInterface {
    height: object,
}

const danHeaderHeight = {
    lg: "10vh",
    md: "8vh",
    sm: "10vh",
    xs: "12vh"
}

const TimeTable: React.FC <timeListInterface> = ({...props}) => {
    
    const [timeList, setTimeList] = useState<React.ReactNode[]>([]);


    useState(() => {
        const list = [];
        for (let i = 1; i < 24; i++) {
          const hour = `${(i < 10 ? '0' : '') + i}:00`;
          list.push(
            <Box
              key={hour}
              className="hour"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                textAlign: 'right',
                border: '1px solid transparent',
                position: 'relative',
                height: "10vh"
              }}
            >
              {hour}
            </Box>
          );
        }
        setTimeList(list);
      });
    


    return(
        <Box
          sx={{
            width: "5.5%",
            zIndex: 5,
          }}
        >
            <Box
                className="dan_header"
                sx={{
                    display: "flex",
                    position:"sticky",
                    borderBottom: "1px solid white",
                    backgroundColor: "white",
                    height: {
                    ...danHeaderHeight
                    },
                    textAlign: "center",
                    zIndex: 6,
                    marginBottom: "0.5em"
                }}
            >

            </Box>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "1em",
                alignItems: "flex-end",
                position:"relative",
                // border: "1px solid black",
                zIndex: 2,
            }}
            >
                {timeList}
            </Box>

        </Box>
    )
}

export default TimeTable