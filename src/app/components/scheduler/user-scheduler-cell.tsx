'use client'
// 14,285
import { Box } from "@mui/material";
import React from "react";
import colors from "@/app/ui/colors";

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
                height: "10%",
                textAlign: "center",
                zIndex: 5,
                borderBottom: `1px solid ${colors.lightGrey}`,
                // borderRight: props.colNumber == 6 ? "" : `2px solid ${colors.secondaryLightBlue}`,
            }}
        >

        </Box>
    )
}

export default UserSchedulerCell