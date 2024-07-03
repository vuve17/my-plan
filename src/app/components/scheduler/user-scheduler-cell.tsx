'use client'

import { Box } from "@mui/material";
import React from "react";
import colors from "@/app/ui/colors";
import { cellHeight } from "@/app/utils";

interface UserSchedulerColumnProps {
    id: string,
    task?: boolean,
    onClick: (id:string) => void,
    colNumber: number

}


const UserSchedulerCell: React.FC<UserSchedulerColumnProps> = ({...props}) => {
    return(
        <Box 
            onClick={(event) => {
                props.onClick(event.currentTarget.id)
                }}
            id={props.id}
            sx={{
                height: {
                    ...cellHeight
                },
                textAlign: "center",
                zIndex: 5,
                borderBottom: `1px solid ${colors.lightGrey}`,
                backgroundColor: "green",
                // borderRight: props.colNumber == 6 ? "" : `2px solid ${colors.secondaryLightBlue}`,
            }}
        >

        </Box>
    )
}

export default UserSchedulerCell